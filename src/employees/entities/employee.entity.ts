import { hashPassword } from 'shared/helpers';
import { Car } from 'cars/entities/car.entity';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  position: string;

  @Column()
  age: number;

  @OneToMany(() => Car, (car) => car.employee)
  cars: Car[];

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
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
