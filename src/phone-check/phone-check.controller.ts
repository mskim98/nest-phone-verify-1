import { Controller, Post, Body, Patch } from '@nestjs/common';
import { PhoneCheckService } from './phone-check.service';
import { CreatePhoneCheckDto } from './dto/create-phone-check.dto';
import { UpdatePhoneCheckDto } from './dto/update-phone-check.dto';
import { validate } from 'class-validator';

@Controller('phone-check')
export class PhoneCheckController {
  constructor(private readonly phoneCheckService: PhoneCheckService) {}

  @Post()
  async create(@Body() createPhoneCheckDto: CreatePhoneCheckDto) {
    const errors = await validate(createPhoneCheckDto);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error('전화번호 검증 실패');
    } else {
      console.log('전화번호 검증 완료');
      console.log(createPhoneCheckDto.phoneNum); // phoneNum이 제대로 들어오는지 확인
    }
    const code = await this.phoneCheckService.create(createPhoneCheckDto);
    return `code : ${code}`;
  }

  @Patch()
  async update(@Body() updatePhoneCheckDto: UpdatePhoneCheckDto) {
    const result = await this.phoneCheckService.check(updatePhoneCheckDto);
    return `result : ${result}`;
  }
}
