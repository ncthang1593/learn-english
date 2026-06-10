import { IsString, IsOptional, IsInt, Min, Max, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
}

export class UpdateSettingsDto {
  @ApiPropertyOptional({ minimum: 5, maximum: 120 })
  @IsInt()
  @Min(5)
  @Max(120)
  @IsOptional()
  dailyGoalMinutes?: number;
}
