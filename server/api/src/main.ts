import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { KeyRingService } from './key-ring/key-ring.service';

async function bootstrap() {
  await KeyRingService.init();

  const useHttps = process.env.START_AS_NODE_HTTPS_SERVER === "true";

  const app = await NestFactory.create(AppModule, {
    ...(useHttps && {
      httpsOptions: {
        key: readFileSync('./certificates/dev-server.key'),
        cert: readFileSync('./certificates/dev-server.crt'),
      }
    }),
  });
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
