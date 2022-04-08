import { ApiResponseProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiResponseProperty({ type: Number })
  public statusCode: number;

  @ApiResponseProperty({ type: String })
  public message: string;

  @ApiResponseProperty()
  public error?: any = null;

  @ApiResponseProperty()
  public data?: T | any = null;
}
