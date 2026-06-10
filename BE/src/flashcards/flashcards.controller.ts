import { Controller, Get, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FlashcardsService, ReviewFlashcardDto } from './flashcards.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Flashcards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get('due')
  @ApiOperation({ summary: 'Lấy danh sách flashcard cần review' })
  getDue(@CurrentUser() user: any) {
    return this.flashcardsService.getDueCards(user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Thống kê flashcard' })
  getStats(@CurrentUser() user: any) {
    return this.flashcardsService.getStats(user.id);
  }

  @Post('review')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ghi nhận kết quả review flashcard (SM-2)' })
  review(@CurrentUser() user: any, @Body() dto: ReviewFlashcardDto) {
    return this.flashcardsService.review(user.id, dto);
  }
}
