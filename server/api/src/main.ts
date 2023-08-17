import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KeyRingService } from './key-ring/key-ring.service';

async function bootstrap() {
  await KeyRingService.init()
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
