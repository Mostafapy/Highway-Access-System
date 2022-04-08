import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
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
export class PassHighwayDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  uuid: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  highwayUUID: string;

  @ApiProperty({ required: true, type: Date })
  @IsString()
  entryTime: Date;

  @ApiProperty({ required: true, type: Date })
  @IsString()
  exitTime: Date;
}

export class PassHighwayResponseDto {
  @ApiResponseProperty({ type: Number })
  currentBalance: number;

  @ApiResponseProperty({ type: String })
  carPlateNumber: string;

  @ApiResponseProperty({ type: String })
  highway: string;
}

export class RegisterCarDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  carUUID: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  highwayUUID: string;
}
