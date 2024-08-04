import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export const Swagger = (
  app: INestApplication,
  configService: ConfigService
): void => {
  const config = new DocumentBuilder()
    .setTitle('PRO Healthy API')
    .addServer(
      `{schema}://${process.env.APP_HOST}:${process.env.APP_PORT}`,
      'API Server',
      { schema: { enum: ['http', 'https'], default: 'http' } }
    )
    .addServer(`{schema}://${process.env.APP_HOST}`, 'HTTPS API Server', {
      schema: { enum: ['https'], default: 'https' },
    })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/swagger', app, document);
};
