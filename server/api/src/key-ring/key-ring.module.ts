import { Module } from '@nestjs/common';
import { KeyRingResolver } from './key-ring.resolver';
import { KeyRingService } from './key-ring.service';

@Module({
  providers: [
    KeyRingResolver,
    KeyRingService
  ]
})
export class KeyRingModule { }
