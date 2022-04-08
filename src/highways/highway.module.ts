import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighwayController } from './controllers/highway.controller';
import { Highway } from './entities/highway.entity';
import { HighwayService } from './services/highway.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Highway]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<number>('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HighwayController],
  providers: [HighwayService],
  exports: [HighwayService],
})
export class HighwayModule {}
