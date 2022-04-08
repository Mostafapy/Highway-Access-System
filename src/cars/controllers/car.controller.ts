import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthUser } from 'auth/decorators/auth-user.decorator';
import { CreateCarDto, UpdateCarDto } from 'cars/dtos/car.dto';
import { CarService } from 'cars/services/car.service';
import { Employee } from 'employees/entities/employee.entity';
import { AuthProtect } from 'shared/decorators/auth-protect.decorator';

@Controller('v1/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @AuthProtect()
  @Post()
  create(@AuthUser() user: Employee, @Body() body: CreateCarDto) {
    return this.carService.create(user, body);
  }

  @AuthProtect()
  @Get()
  findAll(@AuthUser() user: Employee) {
    return this.carService.findAll(user);
  }

  @Put(':criteria')
  update(
    @Param('criteria') criteria: string,
    @AuthUser() user: Employee,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(user, criteria, updateCarDto);
  }

  @Delete(':criteria')
  remove(@Param('criteria') criteria: string, @AuthUser() user: Employee) {
    return this.carService.delete(user, criteria);
  }
}
