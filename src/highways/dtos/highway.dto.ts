import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateHighWayDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  region: string;
}

export class UpdateHighWayDto {
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  region?: string;
}
