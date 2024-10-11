import { Test, TestingModule } from '@nestjs/testing';
import { PhoneCheckService } from './phone-check.service';

describe('PhoneCheckService', () => {
  let service: PhoneCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneCheckService],
    }).compile();

    service = module.get<PhoneCheckService>(PhoneCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
