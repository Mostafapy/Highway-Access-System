import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return {
      ...req.user,
      ...token,
    };
  }
}
