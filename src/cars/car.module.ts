import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessCard } from 'access-cards/entities/access-card.entity';
import { CarController } from './controllers/car.controller';
import { Car } from './entities/car.entity';
import { CarService } from './services/car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, AccessCard]),
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
