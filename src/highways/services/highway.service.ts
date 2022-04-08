import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHighWayDto, UpdateHighWayDto } from 'highways/dtos/highway.dto';
import { Highway } from 'highways/entities/highway.entity';
import { PaginationParams } from 'shared/types/pagination.type';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class HighwayService {
  constructor(@InjectRepository(Highway) private readonly highwayRepository: Repository<Highway>) {}

  async create(CreateHighWayDto: CreateHighWayDto): Promise<Highway> {
    const { name, region } = CreateHighWayDto;

    return this.highwayRepository.save({
      name,
      region,
    });
  }
  async getHighway(uuid: string): Promise<Highway> {
    const foundHighway = await this.highwayRepository.findOne({
      where: { uuid },
    });

    if (!foundHighway) throw new NotFoundException();

    return foundHighway;
  }

  async update(uuid: string, updateHighWayDto: UpdateHighWayDto): Promise<Highway> {
    const foundHighway = await this.getHighway(uuid);

    if (updateHighWayDto.name) foundHighway.name = updateHighWayDto.name;

    if (updateHighWayDto.region) foundHighway.region = updateHighWayDto.region;

    return this.highwayRepository.save(foundHighway);
  }

  findAll(pagination: PaginationParams): Promise<[Highway[], number]> {
    const query: FindOptionsWhere<Highway> = {} as FindOptionsWhere<Highway>;

    const options: FindManyOptions<Highway> = {
      where: query,
      take: pagination.limit,
      skip: pagination.skip,
    };

    return this.highwayRepository.findAndCount(options);
  }

  async findOne(uuid: string): Promise<Highway> {
    return this.getHighway(uuid);
  }

  async delete(uuid: string) {
    const found = await this.getHighway(uuid);

    await this.highwayRepository.delete({ uuid: found.uuid });

    return;
  }
}
