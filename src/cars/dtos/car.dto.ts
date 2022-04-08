import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ required: true })
  @IsString()
  brand: string;

  @ApiProperty({ required: true })
  @IsString()
  model: string;

  @ApiProperty({ required: true, name: 'plate_number', minLength: 5 })
  @Expose({ name: 'plate_number' })
  @IsString()
  plateNumber: string;
}

export class UpdateCarDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false, name: 'plate_number', minLength: 5 })
  @Expose({ name: 'plate_number' })
  @IsOptional()
  @IsString()
  plateNumber?: string;
}
