import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/did';

@Injectable()
export class DIDPrismaService extends PrismaClient implements OnModuleInit {
  private static instance: DIDPrismaService;

  constructor() {
    super();
    console.log("CONSTRUCT SERVICE");
    DIDPrismaService.instance = this;
  }

  public static getInstance(): DIDPrismaService {
    return DIDPrismaService.instance;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
