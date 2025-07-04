import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no permitidas
      transform: true, // 	Convierte tipos automáticamente usando class-transformer
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
