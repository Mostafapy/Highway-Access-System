import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Employee } from 'employees/entities/employee.entity';

export const AuthUser = createParamDecorator(
  <T extends Employee = Employee>(data: string, ctx: ExecutionContext): Employee => {
    const request: any = ctx.switchToHttp().getRequest();

    return !data ? (request.user as T) : (request.user as T)[data];
  },
);
