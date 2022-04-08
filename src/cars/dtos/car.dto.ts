import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @Expose({ name: 'plate_number' })
  @IsString()
  plateNumber: string;
}

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @Expose({ name: 'plate_number' })
  @IsOptional()
  @IsString()
  plateNumber?: string;
}
