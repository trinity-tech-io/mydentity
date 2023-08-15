import { Test, TestingModule } from '@nestjs/testing';
import { KeyRingService } from './key-ring.service';

describe('KeyRingService', () => {
  let service: KeyRingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyRingService],
    }).compile();

    service = module.get<KeyRingService>(KeyRingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
