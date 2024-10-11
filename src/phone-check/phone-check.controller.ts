import { Controller, Post, Body, Get } from '@nestjs/common';
import { PhoneCheckService } from './phone-check.service';
import { CreatePhoneCheckDto } from './dto/create-phone-check.dto';
import { UpdatePhoneCheckDto } from './dto/update-phone-check.dto';
import { validate } from 'class-validator';
import { get } from 'http';

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
    return this.phoneCheckService.create(createPhoneCheckDto);
  }

  @Get()
  update(@Body() updatePhoneCheckDto: UpdatePhoneCheckDto) {
    return this.phoneCheckService.get(updatePhoneCheckDto);
  }
}
