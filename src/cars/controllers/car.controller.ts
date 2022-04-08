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
  @Post('')
  create(@AuthUser() user: Employee, @Body() body: CreateCarDto) {
    return this.carService.create(user, body);
  }

  @AuthProtect()
  @Get('')
  findAll(@AuthUser() user: Employee) {
    return this.carService.findAll(user);
  }

  @AuthProtect()
  @Get(':criterial')
  findOne(@AuthUser() user: Employee, @Param('criteria') criteria: string) {
    return this.carService.findOne(user, criteria);
  }

  @AuthProtect()
  @Put(':criteria')
  update(
    @AuthUser() user: Employee,
    @Param('criteria') criteria: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(user, criteria, updateCarDto);
  }

  @AuthProtect()
  @Delete(':criteria')
  remove(@AuthUser() user: Employee, @Param('criteria') criteria: string) {
    return this.carService.delete(user, criteria);
  }
}
