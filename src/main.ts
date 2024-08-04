import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exceptions';
import { Swagger } from './common/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 5000;

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  if (process.env.APP_ENV === 'development') {
    Swagger(app, configService);
  }

  await app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`),
      console.log(`Режим приложения: ${process.env.APP_ENV}`);
  });
}

bootstrap();
