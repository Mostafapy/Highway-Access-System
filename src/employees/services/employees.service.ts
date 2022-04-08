import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'auth/dtos/auth.dto';
import { FindEmployeeDto } from 'employees/dtos/employee.dto';
import { Employee } from 'employees/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  /**
   * // this service is used to fetch user from DB based on specific criteria as email of id
   * @param criteria
   * @returns
   */
  findOne(criteria: FindEmployeeDto): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { ...criteria },
    });
  }

  create(dto: SignupDto): Promise<Employee> {
    const { name, email, age, position, password, isAdmin } = dto;

    const foundEmployee = this.findOne({ email });

    if (foundEmployee) {
      throw new BadRequestException('User Already Exists');
    }

    const newUser = new Employee({
      name,
      age,
      email,
      position,
      password,
      isAdmin,
    });

    return this.employeeRepository.save(newUser);
  }
}
