import { ApiResponseProperty } from '@nestjs/swagger';
import { Employee } from 'employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccessCard } from './access-card.entity';

@Entity('cars')
export class Car {
  @ApiResponseProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiResponseProperty({ type: String })
  @Column()
  brand: string;

  @ApiResponseProperty({ type: String })
  @Column()
  model: string;

  @ApiResponseProperty({ type: String })
  @Column({ unique: true, name: 'plate_number' })
  plateNumber: string;

  @ApiResponseProperty({ type: String })
  @Column({ name: 'employee_uuid' })
  employeeUUID: string;

  @ManyToOne(() => Employee, (employee) => employee.cars)
  @JoinColumn({ name: 'employee_uuid' })
  employee: Employee;

  @ApiResponseProperty({ type: String })
  @Column({ name: 'access_card_uuid', nullable: true })
  accessCardUUID: string;

  @OneToOne(() => AccessCard, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'access_card_uuid' })
  accessCard: AccessCard;

  @ApiResponseProperty({ type: Date })
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @ApiResponseProperty({ type: Date })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
