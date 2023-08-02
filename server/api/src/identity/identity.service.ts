import { Injectable } from '@nestjs/common';
import { Identity } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdentityInput } from './dto/create-identity.input';

@Injectable()
export class DIDService {
  constructor(private prisma: PrismaService) { }

  async create(createDidInput: CreateIdentityInput): Promise<Identity> {
    const identity = await this.prisma.identity.create({
      data: {
        did: 'did:elastos:' + Math.random()
      }
    })
    return identity;
  }

  findAll() {
    return this.prisma.identity.findMany({
      where: {
        // TODO: auth user id
      }
    })
  }
}
