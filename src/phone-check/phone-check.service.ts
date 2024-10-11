import { Injectable } from '@nestjs/common';
import { CreatePhoneCheckDto } from './dto/create-phone-check.dto';
import { UpdatePhoneCheckDto } from './dto/update-phone-check.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhoneCheckService {
  constructor(private readonly prisma: PrismaService) {}

  private generateRandomCode(): string {
    const randomNumber = Math.floor(Math.random() * 100000);
    return randomNumber.toString().padStart(6, '0');
  }

  async create(createPhoneCheckDto: CreatePhoneCheckDto): Promise<string> {
    console.log('Received phoneNum:', createPhoneCheckDto.phoneNum); // phoneNum이 제대로 들어오는지 확인
    const phoneNum = createPhoneCheckDto.phoneNum; // 받아온 전화번호
    const randomCode = this.generateRandomCode(); // 생성된 6자리 랜던코드

    // 만료 시간 설정 (예: 5분 후)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // 데이터베이스에 전화번호와 인증 코드 저장
    await this.prisma.user.create({
      data: {
        phoneNumber: phoneNum,
        code: randomCode,
        expiresAt: expiresAt,
      },
    });

    return randomCode;
  }

  // update(id: number, updatePhoneCheckDto: UpdatePhoneCheckDto) {
  //   return `This action updates a #${id} phoneCheck`;
  // }
}
