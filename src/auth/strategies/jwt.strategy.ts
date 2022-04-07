import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Employee } from 'employees/entities/employee.entity';
import { EmployeeService } from 'employees/services/employees.service';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy, 'jwt') {
  constructor(private readonly employeeService: EmployeeService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<Employee> {
    return this.employeeService.findOne({ id: payload.id });
  }
}
