import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'auth/decorators/auth-user.decorator';
import { SignupDto } from 'auth/dtos/auth.dto';
import { LocalAuthGuard } from 'auth/guards';
import { AuthService } from 'auth/services/auth.service';
import { Employee } from 'employees/entities/employee.entity';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto): Promise<Employee> {
    return this.authService.signUp(body);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@AuthUser() employee: Employee) {
    const token = await this.authService.login(employee);
    return {
      ...employee.toJSON(),
      ...token,
    };
  }
}
