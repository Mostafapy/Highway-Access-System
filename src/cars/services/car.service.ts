import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessCard } from 'access-cards/entities/access-card.entity';
import { CreateCarDto, UpdateCarDto } from 'cars/dtos/car.dto';
import { Car } from 'cars/entities/car.entity';
import { Employee } from 'employees/entities/employee.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

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
      employeeId: currentUser.id,
    });
  }

  /**
   * Service to get car info by using either car id or car plate
   * @param criteria
   * @returns {Promise<Car> | Error}
   */

  getCar(criteria: number | string): Promise<Car> {
    const options: FindOptionsWhere<Car> = {} as FindOptionsWhere<Car>;

    if (typeof criteria == 'string') {
      options.plateNumber = criteria;
    } else {
      options.id = criteria;
    }
    return this.carRepository.findOne({ where: options });
  }

  /**
   * Service to update car info by using either car id or car plate
   * @param criteria
   * @param updateCarDto
   * @returns {Promise<Car> | Error}
   */
  async update(criteria: number | string, updateCarDto: UpdateCarDto): Promise<Car> {
    const { brand, model, plateNumber } = updateCarDto;

    const foundCar = await this.getCar(criteria);

    if (!foundCar) throw new NotFoundException();

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
  getAll(currentUser: Employee): Promise<Car[]> {
    return this.carRepository.find({ where: { employeeId: currentUser.id } });
  }

  /** */

  async findOne(currentUser: Employee, criteria: number | string): Promise<Car> {
    const foundCar = await this.getCar(criteria);

    if (!foundCar) throw new NotFoundException();

    if (foundCar.employeeId != currentUser.id) {
      throw new BadRequestException('This Car is not owned be the current usr');
    }

    return foundCar;
  }

  /**
   * Delete Car Route
   */

  async deleteCar(currentUser: Employee, criteria: number | string) {
    const foundCar = await this.getCar(criteria);

    if (!foundCar) throw new NotFoundException();

    if (foundCar.employeeId != currentUser.id) {
      throw new BadRequestException('This Car is not owned be the current usr');
    }

    // delete related card if exist
    if (foundCar.accessCardId) {
      await this.AccessCardRepository.delete({ id: foundCar.accessCardId });
    }

    await this.carRepository.delete({ id: foundCar.id });

    return {
      message: 'Car deleted successfully',
    };
  }
}
