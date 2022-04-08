import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessCard } from 'access-cards/entities/access-card.entity';
import { CreateCarDto, UpdateCarDto } from 'cars/dtos/car.dto';
import { Car } from 'cars/entities/car.entity';
import { Employee } from 'employees/entities/employee.entity';
import { decrypt, encrypt } from 'shared/helpers';
import { FindOptionsWhere, Repository } from 'typeorm';

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
    const { brand, model, plateNumber } = updateCarDto;

    const foundCar = await this.getCar(currentUser, criteria);

    if (brand) foundCar.brand = brand;

    if (model) foundCar.model = model;

    if (plateNumber) foundCar.plateNumber = await encrypt(plateNumber);

    return this.carRepository.save(foundCar);
  }

  /**
   * Get All car for current user
   * @param currentUser
   * @returns {Promise<Car[]> | Error}
   */
  async findAll(currentUser: Employee): Promise<Car[]> {
    const cars = await this.carRepository.find({ where: { employeeUUID: currentUser.uuid } });

    if (cars.length > 0) {
      for (const car of cars) {
        car.plateNumber = await decrypt(car.plateNumber);
      }
    }

    return cars;
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
}
