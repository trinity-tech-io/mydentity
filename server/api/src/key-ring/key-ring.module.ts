import { Module } from '@nestjs/common';
import { KeyRingService } from './key-ring.service';
import { KeyRingResolver } from './key-ring.resolver';

@Module({
  providers: [KeyRingResolver, KeyRingService]
})
export class KeyRingModule {}
