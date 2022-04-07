import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessCardModule } from 'access-cards/access-card.module';
import { AuthModule } from 'auth/auth.module';
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
