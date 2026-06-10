import { Controller, Get, Post, Delete, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Progress')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ tiến trình' })
  getProgress(@CurrentUser() user: any) {
    return this.progressService.getFullProgress(user.id);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Lấy dữ liệu tóm tắt cho Dashboard' })
  getDashboard(@CurrentUser() user: any) {
    return this.progressService.getDashboard(user.id);
  }

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk sync tiến trình từ LocalStorage' })
  sync(@CurrentUser() user: any, @Body() localData: any) {
    return this.progressService.bulkSync(user.id, localData);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export toàn bộ dữ liệu user dạng JSON' })
  export(@CurrentUser() user: any) {
    return this.progressService.exportData(user.id);
  }

  @Post('import')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Import dữ liệu từ JSON backup' })
  import(@CurrentUser() user: any, @Body() data: any) {
    return this.progressService.bulkSync(user.id, data);
  }

  @Delete('reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset toàn bộ tiến trình' })
  reset(@CurrentUser() user: any) {
    return this.progressService.resetProgress(user.id);
  }
}
