import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
    cors: true, // TODO: set allowed origins in production & staging environments
  });

  const config = app.get(ConfigService);

  /**
   * Swagger implementation config
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Forus API')
    .setDescription('The Forus Api Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true, //want to make sure that the authentication token persists after refreshing the page
    },
    customSiteTitle: 'Highway Access API', //page tab title
    customfavIcon: '', // favicon url
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(config.get('port'));
  console.log(`Running in port ${config.get('port')}`);
}
bootstrap();
