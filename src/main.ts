import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
