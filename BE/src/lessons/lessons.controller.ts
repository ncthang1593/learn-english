import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LessonsService, LessonCompleteDto } from './lessons.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get('progress')
  @ApiOperation({ summary: 'Lấy tiến trình tất cả bài học' })
  getAllProgress(@CurrentUser() user: any) {
    return this.lessonsService.getLessonProgress(user.id);
  }

  @Get(':lessonId/progress')
  @ApiOperation({ summary: 'Lấy tiến trình 1 bài học' })
  getLessonProgress(@CurrentUser() user: any, @Param('lessonId') lessonId: string) {
    return this.lessonsService.getLessonProgress(user.id, lessonId);
  }

  @Post(':lessonId/complete')
  @ApiOperation({ summary: 'Ghi nhận hoàn thành bài học' })
  completeLesson(
    @CurrentUser() user: any,
    @Param('lessonId') lessonId: string,
    @Body() dto: LessonCompleteDto,
  ) {
    return this.lessonsService.completeLeson(user.id, lessonId, dto);
  }
}
