import { Test, TestingModule } from '@nestjs/testing';
import { PhoneCheckController } from './phone-check.controller';
import { PhoneCheckService } from './phone-check.service';

describe('PhoneCheckController', () => {
  let controller: PhoneCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneCheckController],
      providers: [PhoneCheckService],
    }).compile();

    controller = module.get<PhoneCheckController>(PhoneCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
