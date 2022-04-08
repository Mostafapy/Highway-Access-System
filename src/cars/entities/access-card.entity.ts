import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('access_cards')
export class AccessCard {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (val: number) => val && val.toString(),
      from: (val: string) => parseFloat(val),
    },
  })
  balance: number;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
  updatedAt?: Date;
}
