import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { KeyRingService } from './key-ring/key-ring.service';

async function bootstrap() {
  await KeyRingService.init();

  const httpsOptions = {
    key: readFileSync('./certificates/dev-server.key'),
    cert: readFileSync('./certificates/dev-server.crt'),
  };

  const useHttps = process.env.SERVER_URL.startsWith("https");

  const app = await NestFactory.create(AppModule, {
    ...(useHttps && { httpsOptions }),
  });
  app.setGlobalPrefix("/api");
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
