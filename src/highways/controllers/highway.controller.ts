import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateHighWayDto, UpdateHighWayDto } from 'highways/dtos/highway.dto';
import { Highway } from 'highways/entities/highway.entity';
import { HighwayService } from 'highways/services/highway.service';
import { AuthProtect, Pagination } from 'shared/decorators';
import { ResponseDto } from 'shared/dtos/response.dto';
import { getPageDescriptor } from 'shared/helpers';
import { PaginatedData, PaginationParams } from 'shared/types/pagination.type';

Controller('v1/highways');
export class HighwayController {
  constructor(private readonly highwayService: HighwayService) {}

  @AuthProtect()
  @Post('')
  async create(@Body() body: CreateHighWayDto): Promise<ResponseDto<Highway>> {
    const data = await this.highwayService.create(body);

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
  ): Promise<ResponseDto<PaginatedData<Highway>>> {
    const [data, total] = await this.highwayService.findAll(pagination);

    return {
      statusCode: 200,
      message: 'All highways Are Retrieved Succesfully',
      data: {
        pagination: getPageDescriptor(pagination, total),
        data,
      },
    };
  }

  @AuthProtect()
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ResponseDto<Highway>> {
    const data = await this.highwayService.findOne(uuid);

    return {
      statusCode: 200,
      message: 'Your Requested Highway is Retrieved Succesfully',
      data,
    };
  }

  @AuthProtect()
  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateHighWayDto: UpdateHighWayDto,
  ): Promise<ResponseDto<Highway>> {
    const data = await this.highwayService.update(uuid, updateHighWayDto);

    return {
      statusCode: 200,
      message: 'Your Requested Highway is Updated Succesfully',
      data,
    };
  }

  @AuthProtect()
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<ResponseDto<any>> {
    await this.highwayService.delete(uuid);

    return {
      statusCode: 200,
      message: 'Your Requested Highway is Deleted Succesfully',
    };
  }
}