import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ required: true })
  @IsString()
  brand: string;

  @ApiProperty({ required: true })
  @IsString()
  model: string;

  @ApiProperty({ required: true, minLength: 5 })
  @IsString()
  plateNumber: string;
}

export class UpdateCarDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false, minLength: 5, type: String })
  @IsOptional()
  @IsString()
  plateNumber?: string;
}
