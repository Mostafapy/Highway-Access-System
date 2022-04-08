import { Highway } from 'highways/entities/highway.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Entity('gates')
export class Gate {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ name: 'entry_Time', type: 'datetime' })
  entryTime: Date;

  @Column({ name: 'exit_Time', type: 'datetime' })
  exitTime: Date;

  @Column({ name: 'highway_uuid' })
  highwayUUID: string;

  @OneToOne(() => Highway, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'highway_uuid' })
  highway: Highway;

  @Column({ name: 'car_uuid' })
  carUUID: string;

  @OneToOne(() => Car, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'car_uuid' })
  car: Car;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
