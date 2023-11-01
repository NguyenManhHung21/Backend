import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * How to generate  a module:
 * nest g module 'module name'
 *
 * We have 2 entities: User and Node, 1 User can write many Note
 *
 * -controller is where to recieve request from client
 * -contoller will call services to do implementations
 *
 * Now, We add a  module named "prisma"
 *
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //add middleware to validate request from client
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
