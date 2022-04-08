import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @ApiProperty({ type: Boolean, required: true })
  @IsOptional()
  @IsNumber()
  isAdmin?: boolean;
}

export class loginResponseDto {
  @ApiResponseProperty({ type: String })
  @Expose({ name: 'access_token' })
  @IsString()
  accessToken: string;

  @ApiResponseProperty({ type: String })
  @Expose({ name: 'token_validity' })
  @IsString()
  tokenValidity: number;

  constructor(data: Partial<loginResponseDto>) {
    Object.assign(this, data);
  }
}
