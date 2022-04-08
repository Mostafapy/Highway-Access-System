import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto, UpdateCarDto } from 'cars/dtos/car.dto';
import { AccessCard } from 'cars/entities/access-card.entity';
import { Car } from 'cars/entities/car.entity';
import { Employee } from 'employees/entities/employee.entity';
import { decrypt, encrypt } from 'shared/helpers';
import { PaginationParams } from 'shared/types/pagination.type';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(AccessCard) private readonly AccessCardRepository: Repository<AccessCard>,
  ) {}

  async create(currentUser: Employee, createCarDto: CreateCarDto): Promise<Car> {
    const { brand, model, plateNumber } = createCarDto;

    const encryptedPlateNumber = await encrypt(plateNumber);

    return this.carRepository.save({
      brand,
      model,
      plateNumber: encryptedPlateNumber,
      employeeUUID: currentUser.uuid,
    });
  }

  /**
   * Service to get car info by using either car uuid or car plate
   * @param criteria
   * @returns {Promise<Car> | Error}
   */

  async getCar(user: Employee, criteria: string): Promise<Car> {
    const conditions: FindOptionsWhere<Car>[] = [{ uuid: criteria }, { plateNumber: criteria }];

    if (!user.isAdmin) {
      conditions.push({ employeeUUID: user.uuid });
    }
    const foundCar = await this.carRepository.findOne({
      where: conditions,
    });

    if (!foundCar) throw new NotFoundException();

    foundCar.plateNumber = await decrypt(foundCar.plateNumber);

    return foundCar;
  }

  /**
   * Service to update car info by using either car id or car plate
   * @param criteria
   * @param updateCarDto
   * @returns {Promise<Car> | Error}
   */
  async update(currentUser: Employee, criteria: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const foundCar = await this.getCar(currentUser, criteria);

    if (updateCarDto.brand) foundCar.brand = updateCarDto.brand;

    if (updateCarDto.model) foundCar.model = updateCarDto.model;

    if (updateCarDto.plateNumber) foundCar.plateNumber = await encrypt(updateCarDto.plateNumber);

    return this.carRepository.save(foundCar);
  }

  /**
   * Get All car for current user
   * @param currentUser
   * @returns {Promise<Car[]> | Error}
   */
  async findAll(pagination: PaginationParams, currentUser: Employee): Promise<[Car[], number]> {
    const query: FindOptionsWhere<Car> = {} as FindOptionsWhere<Car>;

    if (!currentUser.isAdmin) {
      query.employeeUUID = currentUser.uuid;
    }

    const options: FindManyOptions<Car> = {
      where: query,
      take: pagination.limit,
      skip: pagination.skip,
    };

    const [cars, total] = await this.carRepository.findAndCount(options);

    if (cars.length > 0) {
      for (const car of cars) {
        car.plateNumber = await decrypt(car.plateNumber);
      }
    }

    return [cars, total];
  }

  /**
   * Find one car with criteria uuid or plate number
   * @param currentUser
   * @param criteria
   * @returns
   */

  async findOne(currentUser: Employee, criteria: string): Promise<Car> {
    return this.getCar(currentUser, criteria);
  }

  /**
   * Delete Car Route
   */

  async delete(currentUser: Employee, criteria: string) {
    const foundCar = await this.getCar(currentUser, criteria);

    // delete related card if exist
    if (foundCar.accessCardUUID) {
      await this.AccessCardRepository.delete({ uuid: foundCar.accessCardUUID });
    }

    await this.carRepository.delete({ uuid: foundCar.uuid });

    return;
  }

  /**
   * Register a car on high way
   */
}
