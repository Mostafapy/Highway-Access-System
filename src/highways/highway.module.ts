import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighwayController } from './controllers/highway.controller';
import { Highway } from './entities/highway.entity';
import { HighwayService } from './services/highway.service';

@Module({
  imports: [TypeOrmModule.forFeature([Highway])],
  controllers: [HighwayController],
  providers: [HighwayService],
  exports: [HighwayService],
})
export class HighwayModule {}
