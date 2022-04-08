import { hashPassword } from 'shared/helpers';
import { Car } from 'cars/entities/car.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity('employees')
export class Employee {
  @ApiResponseProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiResponseProperty({ type: String })
  @Column({ length: 255 })
  name: string;

  @ApiResponseProperty({ type: String })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiResponseProperty({ type: String })
  @Column()
  position: string;

  @ApiResponseProperty({ type: Number })
  @Column()
  age: number;

  @ApiResponseProperty({ type: Boolean })
  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @OneToMany(() => Car, (car) => car.employee)
  cars: Car[];

  @ApiResponseProperty({ type: Date })
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @ApiResponseProperty({ type: Date })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  constructor(partial: Partial<Employee>) {
    Object.assign(this, partial);
  }

  toJSON() {
    return instanceToPlain(this);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
