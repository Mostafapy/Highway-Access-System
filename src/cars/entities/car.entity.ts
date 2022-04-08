import { AccessCard } from 'access-cards/entities/access-card.entity';
import { Expose } from 'class-transformer';
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

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Expose({ name: 'plate_number' })
  @Column({ unique: true, name: 'plate_number' })
  plateNumber: string;

  @Column({ name: 'employee_id' })
  @Expose({ name: 'employee_id' })
  employeeId: number;

  @ManyToOne(() => Employee, (employee) => employee.cars)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'access_card_id' })
  @Expose({ name: 'access_card_id' })
  accessCardId: number;

  @Expose({ name: 'access_card' })
  @OneToOne(() => AccessCard, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'access_card_id' })
  accessCard: AccessCard;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
  updatedAt?: Date;
}
