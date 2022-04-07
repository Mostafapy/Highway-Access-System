import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessCardModule } from 'access-cards/access-card.module';
import { CarModule } from 'cars/car.module';
import { MYSQL_CONFIG_OPTIONS } from 'config/mysql-configuration';
import { EmployeeModule } from 'employees/employee.module';
import { JoiPipeModule } from 'nestjs-joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      ...MYSQL_CONFIG_OPTIONS,
    }),
    JoiPipeModule,
    EmployeeModule,
    CarModule,
    AccessCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
