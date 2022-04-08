import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'auth/decorators/auth-user.decorator';
import { SignupDto } from 'auth/dtos/auth.dto';
import { LocalAuthGuard } from 'auth/guards';
import { AuthService } from 'auth/services/auth.service';
import { Employee } from 'employees/entities/employee.entity';
import { ResponseDto } from 'shared/dtos/response.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignupDto): Promise<ResponseDto<Employee>> {
    const data = await this.authService.signUp(body);

    return {
      statusCode: 201,
      message: 'Successfully Signed Up',
      data,
    };
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@AuthUser() employee: Employee): Promise<ResponseDto<any>> {
    const token = await this.authService.login(employee);

    return {
      statusCode: 200,
      message: 'Successfully Logged In',
      data: {
        ...employee.toJSON(),
        ...token,
      },
    };
  }
}
