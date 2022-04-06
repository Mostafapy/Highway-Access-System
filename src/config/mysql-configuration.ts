import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';

const config = dotenv.parse(fs.readFileSync(join(__dirname, '../../.env')));

// Constant special names
export const MYSQL_CONFIG_OPTIONS: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.TYPEORM_HOST,
  port: +config.TYPEORM_PORT,
  username: config.TYPEORM_USERNAME,
  password: config.TYPEORM_PASSWORD,
  database: config.TYPEORM_DATABASE,
  synchronize: true,
  autoLoadEntities: true,
  timezone: 'Z',
};
