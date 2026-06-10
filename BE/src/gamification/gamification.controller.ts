import { Controller, Get, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Gamification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Lấy thống kê XP, level, streak' })
  getStats(@CurrentUser() user: any) {
    return this.gamificationService.getStats(user.id);
  }

  @Post('checkin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Daily check-in - cập nhật streak' })
  checkin(@CurrentUser() user: any) {
    return this.gamificationService.dailyCheckin(user.id);
  }

  @Get('achievements')
  @ApiOperation({ summary: 'Danh sách achievements và trạng thái' })
  getAchievements(@CurrentUser() user: any) {
    return this.gamificationService.getAchievements(user.id);
  }
}
