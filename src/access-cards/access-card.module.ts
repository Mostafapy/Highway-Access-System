import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessCard } from './entities/access-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessCard])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AccessCardModule {}
