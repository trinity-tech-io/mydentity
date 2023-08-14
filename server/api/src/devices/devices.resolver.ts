import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Device], { name: 'devices' })
  findAll(@CurrentUser() user: User) {
    return this.devicesService.findAll(user);
  }
}
