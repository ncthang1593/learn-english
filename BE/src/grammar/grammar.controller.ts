import { Controller, Get, Post, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GrammarService } from './grammar.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Grammar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grammar')
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Get('read-status')
  @ApiOperation({ summary: 'Lấy danh sách grammar topics đã đọc' })
  getReadStatus(@CurrentUser() user: any) {
    return this.grammarService.getReadStatus(user.id);
  }

  @Post(':topicId/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đánh dấu đã đọc grammar topic' })
  markRead(@CurrentUser() user: any, @Param('topicId') topicId: string) {
    return this.grammarService.markRead(user.id, topicId);
  }
}
