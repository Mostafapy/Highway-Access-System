import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
    cors: true, // TODO: set allowed origins in production & staging environments
  });

  const config = app.get(ConfigService);

  await app.listen(config.get('port'));
  console.log(`Running in port ${config.get('port')}`);
}
bootstrap();
