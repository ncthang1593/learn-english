import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: '[Admin] Thống kê tổng quan' })
  getStats() {
    return this.adminService.getStats();
  }

  // ===== Lessons =====
  @Get('lessons')
  @ApiOperation({ summary: '[Admin] Danh sách bài học' })
  getLessons(@Query('levelId') levelId?: string) {
    return this.adminService.getLessons(levelId);
  }

  @Post('lessons')
  @ApiOperation({ summary: '[Admin] Tạo bài học mới' })
  createLesson(@Body() data: any) {
    return this.adminService.createLesson(data);
  }

  @Patch('lessons/:id')
  @ApiOperation({ summary: '[Admin] Cập nhật bài học' })
  updateLesson(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateLesson(id, data);
  }

  @Delete('lessons/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[Admin] Xóa bài học' })
  deleteLesson(@Param('id') id: string) {
    return this.adminService.deleteLesson(id);
  }

  // ===== Grammar =====
  @Get('grammar')
  @ApiOperation({ summary: '[Admin] Danh sách grammar topics' })
  getGrammar(@Query('categoryId') categoryId?: string) {
    return this.adminService.getGrammarTopics(categoryId);
  }

  @Post('grammar')
  @ApiOperation({ summary: '[Admin] Tạo grammar topic mới' })
  createGrammar(@Body() data: any) {
    return this.adminService.createGrammarTopic(data);
  }

  @Patch('grammar/:id')
  @ApiOperation({ summary: '[Admin] Cập nhật grammar topic' })
  updateGrammar(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateGrammarTopic(id, data);
  }

  @Delete('grammar/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[Admin] Xóa grammar topic' })
  deleteGrammar(@Param('id') id: string) {
    return this.adminService.deleteGrammarTopic(id);
  }
}
