import { BadRequestException, ExecutionContext, Injectable, ValidationError } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IsNotEmpty, validateOrReject } from 'class-validator';

export class Login {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super();
  }
  public async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const credentials = new Login();
    credentials.email = req.body.email;
    credentials.password = req.body.password;

    await validateOrReject(credentials).catch((errors) => {
      throw new BadRequestException(
        errors
          .map((a: ValidationError) => a.constraints)
          .map((obj) => {
            return Object.values(obj)[0];
          }),
      );
    });
    return super.canActivate(context);
  }
}
