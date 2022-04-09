import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthProtect } from 'auth/decorators';
import { Privilege } from 'auth/enums/privilege.enum';
import { CreateHighWayDto, UpdateHighWayDto } from 'highways/dtos/highway.dto';
import { Highway } from 'highways/entities/highway.entity';
import { HighwayService } from 'highways/services/highway.service';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { ResponseDto } from 'shared/dtos/response.dto';
import { getPageDescriptor } from 'shared/helpers';
import { PaginatedData, PaginationParams } from 'shared/types/pagination.type';

@ApiTags('v1/highways')
@Controller('v1/highways')
export class HighwayController {
  constructor(private readonly highwayService: HighwayService) {}

  @ApiOperation({ summary: 'Create Highway' })
  @ApiResponse({ status: 201 })
  @AuthProtect(Privilege.ADMIN)
  @Post('')
  async create(@Body() body: CreateHighWayDto): Promise<ResponseDto<Highway>> {
    const data = await this.highwayService.create(body);

    return {
      statusCode: 201,
      message: 'Created Sucessfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Retrieve Highways' })
  @ApiResponse({ status: 200 })
  @AuthProtect(Privilege.ADMIN)
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

  @ApiOperation({ summary: 'Get One Highway By ID' })
  @ApiResponse({ status: 200 })
  @AuthProtect(Privilege.ADMIN)
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ResponseDto<Highway>> {
    const data = await this.highwayService.findOne(uuid);

    return {
      statusCode: 200,
      message: 'Your Requested Highway is Retrieved Succesfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Update Highway By ID' })
  @ApiResponse({ status: 200 })
  @AuthProtect(Privilege.ADMIN)
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

  @ApiOperation({ summary: 'Delete Highway By ID' })
  @ApiResponse({ status: 200 })
  @AuthProtect(Privilege.ADMIN)
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<ResponseDto<any>> {
    await this.highwayService.delete(uuid);

    return {
      statusCode: 200,
      message: 'Your Requested Highway is Deleted Succesfully',
    };
  }
}
