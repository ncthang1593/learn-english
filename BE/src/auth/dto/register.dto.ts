import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ example: 'nguyen_van_a' })
  @IsString()
  @MinLength(3, { message: 'Username tối thiểu 3 ký tự' })
  @MaxLength(30, { message: 'Username tối đa 30 ký tự' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username chỉ chứa chữ, số và dấu _' })
  username: string;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString()
  @MinLength(2, { message: 'Tên hiển thị tối thiểu 2 ký tự' })
  @MaxLength(50, { message: 'Tên hiển thị tối đa 50 ký tự' })
  displayName: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  @MaxLength(100)
  password: string;
}
