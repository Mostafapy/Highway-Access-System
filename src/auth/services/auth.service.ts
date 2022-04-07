import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { loginResponseDto, SignupDto } from 'auth/dtos/auth.dto';
import { comparePasswords } from 'auth/helpers/passwords.helper';
import { Employee } from 'employees/entities/employee.entity';
import { EmployeeService } from 'employees/services/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.employeeService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }

  login(user: Employee): loginResponseDto {
    const expiresIn = this.configService.get<number>('jwt.expiresIn');
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      tokenValidity: expiresIn,
    };
  }

  signUp(data: SignupDto): Promise<Employee> {
    return this.employeeService.create(data);
  }
}
