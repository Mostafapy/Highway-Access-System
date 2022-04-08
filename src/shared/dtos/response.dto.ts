export class ResponseDto<T> {
  public statusCode: number;
  public message: string;
  public error?: any = null;
  public data?: T | any = null;
}
