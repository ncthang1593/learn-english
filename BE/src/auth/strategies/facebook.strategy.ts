import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID || '',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback',
      scope: ['email'],
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user?: any) => void,
  ) {
    const { id, emails, name, photos } = profile;
    const email = emails?.[0]?.value || '';
    const displayName = `${name?.givenName || ''} ${name?.familyName || ''}`.trim();
    const avatar = photos?.[0]?.value;

    const user = await this.authService.findOrCreateOAuthUser({
      facebookId: id,
      email,
      displayName,
      avatarUrl: avatar,
    });

    done(null, user);
  }
}
