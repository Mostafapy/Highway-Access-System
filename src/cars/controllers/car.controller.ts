import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags('v1/cars')
@AuthProtect()
@Controller('v1/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Create Car' })
  @ApiResponse({ status: 201 })
  @Post('')
  async create(@AuthUser() user: Employee, @Body() body: CreateCarDto): Promise<ResponseDto<Car>> {
    const data = await this.carService.create(user, body);

    return {
      statusCode: 201,
      message: 'Created Sucessfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Retrieve Car' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Retrieve One Car' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Update Car' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Delete Car' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Register Car On Highway' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Pass Car On Highway' })
  @ApiResponse({ status: 200 })
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
