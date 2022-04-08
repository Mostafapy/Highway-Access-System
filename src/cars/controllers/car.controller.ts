import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthProtect } from 'auth/decorators';
import { AuthUser } from 'auth/decorators/auth-user.decorator';
import {
  CreateCarDto,
  PassHighwayDto,
  PassHighwayResponseDto,
  RegisterCarDto,
  UpdateCarDto,
} from 'cars/dtos/car.dto';
import { Car } from 'cars/entities/car.entity';
import { Gate } from 'cars/entities/gate.entity';
import { CarService } from 'cars/services/car.service';
import { Employee } from 'employees/entities/employee.entity';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { ResponseDto } from 'shared/dtos/response.dto';
import { getPageDescriptor } from 'shared/helpers';
import { PaginatedData, PaginationParams } from 'shared/types/pagination.type';

@Controller('v1/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @AuthProtect()
  @Post('')
  async create(@AuthUser() user: Employee, @Body() body: CreateCarDto): Promise<ResponseDto<Car>> {
    const data = await this.carService.create(user, body);

    return {
      statusCode: 201,
      message: 'Created Sucessfully',
      data,
    };
  }

  @AuthProtect()
  @Get('')
  async findAll(
    @Pagination() pagination: PaginationParams,
    @AuthUser() user: Employee,
  ): Promise<ResponseDto<PaginatedData<Car>>> {
    const [data, total] = await this.carService.findAll(pagination, user);

    return {
      statusCode: 200,
      message: 'All Cars Are Retrieved Succesfully',
      data: {
        pagination: getPageDescriptor(pagination, total),
        data,
      },
    };
  }

  @AuthProtect()
  @Get(':criterial')
  async findOne(
    @AuthUser() user: Employee,
    @Param('criteria') criteria: string,
  ): Promise<ResponseDto<Car>> {
    const data = await this.carService.findOne(user, criteria);

    return {
      statusCode: 200,
      message: 'Your Requested Car is Retrieved Succesfully',
      data,
    };
  }

  @AuthProtect()
  @Put(':criteria')
  async update(
    @AuthUser() user: Employee,
    @Param('criteria') criteria: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<ResponseDto<Car>> {
    const data = await this.carService.update(user, criteria, updateCarDto);

    return {
      statusCode: 200,
      message: 'Your Requested Car is Updated Succesfully',
      data,
    };
  }

  @AuthProtect()
  @Delete(':criteria')
  async remove(
    @AuthUser() user: Employee,
    @Param('criteria') criteria: string,
  ): Promise<ResponseDto<any>> {
    await this.carService.delete(user, criteria);

    return {
      statusCode: 200,
      message: 'Your Requested Car is Deleted Succesfully',
    };
  }

  @AuthProtect()
  @Put('/register')
  async registerCar(
    @AuthUser() user: Employee,
    @Body() body: RegisterCarDto,
  ): Promise<ResponseDto<Gate>> {
    const data = await this.carService.registerCarOnHighway(user, body);

    return {
      statusCode: 200,
      message: 'Your Requested Car has been registered Succesfully',
      data,
    };
  }

  @AuthProtect()
  @Post('/pass')
  async passCar(
    @AuthUser() user: Employee,
    @Body() body: PassHighwayDto,
  ): Promise<ResponseDto<PassHighwayResponseDto>> {
    const data = await this.carService.PassHighway(user, body);

    return {
      statusCode: 200,
      message: 'Successfully Passed through the required highway',
      data,
    };
  }
}
