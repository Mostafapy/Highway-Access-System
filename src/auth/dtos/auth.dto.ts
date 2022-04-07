import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly position: string;

  @IsNumber()
  readonly age: number;
}

export class loginResponseDto {
  @Expose({ name: 'access_token' })
  @IsString()
  accessToken: string;

  @Expose({ name: 'token_validity' })
  @IsString()
  tokenValidity: number;

  constructor(data: Partial<loginResponseDto>) {
    Object.assign(this, data);
  }
}
