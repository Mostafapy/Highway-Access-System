import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highway } from 'highways/entities/highway.entity';
import { CarController } from './controllers/car.controller';
import { AccessCard } from './entities/access-card.entity';
import { Car } from './entities/car.entity';
import { Gate } from './entities/gate.entity';
import { CarService } from './services/car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, AccessCard, Gate, Highway]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<number>('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
