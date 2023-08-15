import { Test, TestingModule } from '@nestjs/testing';
import { KeyRingResolver } from './key-ring.resolver';
import { KeyRingService } from './key-ring.service';

describe('KeyRingResolver', () => {
  let resolver: KeyRingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyRingResolver, KeyRingService],
    }).compile();

    resolver = module.get<KeyRingResolver>(KeyRingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
