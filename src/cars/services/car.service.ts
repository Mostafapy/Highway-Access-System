import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessCard } from 'access-cards/entities/access-card.entity';
import { CreateCarDto, UpdateCarDto } from 'cars/dtos/car.dto';
import { Car } from 'cars/entities/car.entity';
import { Employee } from 'employees/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(AccessCard) private readonly AccessCardRepository: Repository<AccessCard>,
  ) {}

  async create(currentUser: Employee, createCarDto: CreateCarDto): Promise<Car> {
    const { brand, model, plateNumber } = createCarDto;

    return this.carRepository.create({
      brand,
      model,
      plateNumber,
      employeeUUID: currentUser.uuid,
    });
  }

  /**
   * Service to get car info by using either car uuid or car plate
   * @param criteria
   * @returns {Promise<Car> | Error}
   */

  getCar(criteria: string): Promise<Car> {
    return this.carRepository.findOne({ where: [{ uuid: criteria }, { plateNumber: criteria }] });
  }

  /**
   * Service to update car info by using either car id or car plate
   * @param criteria
   * @param updateCarDto
   * @returns {Promise<Car> | Error}
   */
  async update(currentUser: Employee, criteria: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const { brand, model, plateNumber } = updateCarDto;

    const foundCar = await this.getCar(criteria);

    if (!foundCar) throw new NotFoundException();

    if (foundCar.employeeUUID != currentUser.uuid) {
      throw new BadRequestException('This Car is not owned be the current usr');
    }

    if (brand) foundCar.brand = brand;

    if (model) foundCar.model = model;

    if (plateNumber) foundCar.plateNumber = plateNumber;

    return this.carRepository.save(foundCar);
  }

  /**
   * Get All car for current user
   * @param currentUser
   * @returns {Promise<Car[]> | Error}
   */
  findAll(currentUser: Employee): Promise<Car[]> {
    return this.carRepository.find({ where: { employeeUUID: currentUser.uuid } });
  }

  /**
   * Find one car with criteria uuid or plate number
   * @param currentUser
   * @param criteria
   * @returns
   */

  async findOne(currentUser: Employee, criteria: string): Promise<Car> {
    const foundCar = await this.getCar(criteria);

    if (!foundCar) throw new NotFoundException();

    if (foundCar.employeeUUID != currentUser.uuid) {
      throw new BadRequestException('This Car is not owned be the current usr');
    }

    return foundCar;
  }

  /**
   * Delete Car Route
   */

  async delete(currentUser: Employee, criteria: string) {
    const foundCar = await this.getCar(criteria);

    if (!foundCar) throw new NotFoundException();

    if (foundCar.employeeUUID != currentUser.uuid) {
      throw new BadRequestException('This Car is not owned be the current usr');
    }

    // delete related card if exist
    if (foundCar.accessCardUUID) {
      await this.AccessCardRepository.delete({ uuid: foundCar.accessCardUUID });
    }

    await this.carRepository.delete({ uuid: foundCar.uuid });

    return {
      message: 'Car deleted successfully',
    };
  }
}
