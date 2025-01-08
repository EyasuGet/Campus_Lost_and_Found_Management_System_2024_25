import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use("/uploads", express.static(join(".","uploads")))
  app.enableCors({
    origin: 'http://127.0.0.1:5501',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Throw an error if unknown properties are sent
    transform: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();