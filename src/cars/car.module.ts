import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessCard } from 'access-cards/entities/access-card.entity';
import { CarController } from './controllers/car.controller';
import { Car } from './entities/car.entity';
import { CarService } from './services/car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, AccessCard])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
