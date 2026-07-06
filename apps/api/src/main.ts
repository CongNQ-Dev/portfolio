/**
 * main.ts — NestJS application entry point.
 *
 * Bootstraps the HTTP server with three cross-cutting concerns:
 *  1. Global prefix  : all routes live under /api
 *  2. CORS           : allows the Next.js frontend (localhost:3000) to call the API
 *  3. ValidationPipe : validates and strips unrecognised DTO fields (useful for
 *                      POST/PATCH endpoints when blog CRUD is added later)
 *  4. Swagger        : interactive API docs at /api/docs — great for learning
 *                      what each endpoint returns without reading source code
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 4000;

  // Every route is prefixed with /api so controllers don't repeat it.
  app.setGlobalPrefix('api');

  // Allow the Next.js dev server to call this API from the browser.
  // In production you would restrict this to your actual domain.
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  });

  // Automatically validate incoming request bodies.
  // whitelist: true strips properties that have no matching DTO field —
  // prevents clients from injecting unexpected fields.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger UI — visit /api/docs in the browser while the server is running.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription(
      'REST API for the Cong Nguyen portfolio site. ' +
      'All read endpoints are public. Authentication will be added for write endpoints.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  console.log(`\nAPI running at  http://localhost:${port}/api`);
  console.log(`Swagger docs at http://localhost:${port}/api/docs\n`);
}

bootstrap();
