import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DictionaryService } from './dictionary.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Dictionary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('lookup')
  @ApiOperation({ summary: 'Tra từ tiếng Anh, tự động lấy phát âm và dịch tiếng Việt' })
  @ApiQuery({ name: 'word', required: true, description: 'Từ vựng cần tra' })
  async lookupWord(@Query('word') word: string) {
    if (!word) {
      return { error: 'Vui lòng cung cấp từ vựng' };
    }
    return this.dictionaryService.lookupWord(word);
  }
}
