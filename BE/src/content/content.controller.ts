import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentService } from './content.service';

@ApiTags('Content (Public)')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('levels')
  @ApiOperation({ summary: 'Lấy tất cả levels và lessons (public)' })
  getLevels() {
    return this.contentService.getLevels();
  }

  @Get('grammar')
  @ApiOperation({ summary: 'Lấy tất cả grammar topics (public)' })
  getGrammar() {
    return this.contentService.getGrammar();
  }

  @Get('grammar/:topicId')
  @ApiOperation({ summary: 'Lấy chi tiết 1 grammar topic (public)' })
  getGrammarTopic(@Param('topicId') topicId: string) {
    return this.contentService.getGrammarTopic(topicId);
  }

  @Get('achievements')
  @ApiOperation({ summary: 'Lấy danh sách achievements definitions (public)' })
  getAchievements() {
    return this.contentService.getAchievements();
  }
}
