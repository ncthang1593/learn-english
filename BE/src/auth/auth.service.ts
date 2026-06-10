import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ===== Register =====
  async register(dto: RegisterDto) {
    const existingEmail = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingEmail) throw new ConflictException('Email đã được sử dụng');

    const existingUsername = await this.prisma.user.findUnique({ where: { username: dto.username } });
    if (existingUsername) throw new ConflictException('Username đã được sử dụng');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        displayName: dto.displayName,
        passwordHash,
        progress: {
          create: {}, // Initialize empty progress
        },
      },
      select: {
        id: true, email: true, username: true,
        displayName: true, avatarUrl: true, role: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user, ...tokens };
  }

  // ===== Login =====
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    if (!user.passwordHash) throw new UnauthorizedException('Tài khoản này dùng OAuth, vui lòng đăng nhập qua Google/Facebook');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const { passwordHash: _pw, ...safeUser } = user;
    return { user: safeUser, ...tokens };
  }

  // ===== OAuth: Find or Create user =====
  async findOrCreateOAuthUser(data: {
    googleId?: string;
    facebookId?: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
  }) {
    // Find by OAuth ID
    const whereClause = data.googleId
      ? { googleId: data.googleId }
      : { facebookId: data.facebookId };

    let user = await this.prisma.user.findFirst({ where: whereClause });

    if (!user && data.email) {
      user = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (user) {
        // Link OAuth to existing account
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: data.googleId ? { googleId: data.googleId } : { facebookId: data.facebookId },
        });
      }
    }

    if (!user) {
      // Create new user from OAuth
      const username = await this.generateUniqueUsername(data.displayName);
      user = await this.prisma.user.create({
        data: {
          email: data.email,
          username,
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
          ...(data.googleId ? { googleId: data.googleId } : { facebookId: data.facebookId }),
          progress: { create: {} },
        },
      });
    }

    return user;
  }

  // ===== OAuth callback – generate redirect URL for FE =====
  async handleOAuthCallback(user: any): Promise<string> {
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    const params = new URLSearchParams({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
    return `${frontendUrl}/auth/callback?${params.toString()}`;
  }

  // ===== Refresh Token =====
  async refreshToken(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
      });
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }

    const stored = await this.prisma.refreshToken.findFirst({
      where: { userId: payload.sub, revoked: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!stored) throw new UnauthorizedException('Refresh token đã bị thu hồi');

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true },
    });
    if (!user) throw new UnauthorizedException('User không tồn tại');

    // Revoke old token
    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return tokens;
  }

  // ===== Logout =====
  async logout(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  // ===== Private helpers =====
  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtSecret,
        expiresIn: '900', // 15 minutes in seconds
      } as JwtSignOptions),
      this.jwtService.signAsync(payload, {
        secret: jwtRefreshSecret,
        expiresIn: '604800', // 7 days in seconds
      } as JwtSignOptions),
    ]);

    // Store refresh token hash
    const tokenHash = await bcrypt.hash(refreshToken, 1);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.prisma.refreshToken.create({
      data: { userId, tokenHash, expiresAt },
    });

    return { accessToken, refreshToken };
  }

  private async generateUniqueUsername(displayName: string): Promise<string> {
    const base = displayName
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
      .substring(0, 20) || 'user';

    let username = base;
    let counter = 1;
    while (await this.prisma.user.findUnique({ where: { username } })) {
      username = `${base}_${counter++}`;
    }
    return username;
  }
}
