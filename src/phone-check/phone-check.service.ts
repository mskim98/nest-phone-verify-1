import { Injectable } from '@nestjs/common';
import { CreatePhoneCheckDto } from './dto/create-phone-check.dto';
import { UpdatePhoneCheckDto } from './dto/update-phone-check.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhoneCheckService {
  constructor(private readonly prisma: PrismaService) {}

  private generateRandomCode(): string {
    const randomNumber = Math.floor(Math.random() * 1000000); // 6자리 랜덤 숫자 생성
    return randomNumber.toString().padStart(6, '0');
  }

  async create(createPhoneCheckDto: CreatePhoneCheckDto): Promise<string> {
    const phoneNum = createPhoneCheckDto.phoneNum; // 받아온 전화번호
    const randomCode = this.generateRandomCode(); // 생성된 6자리 랜덤 코드

    // 만료 시간 설정 (예: 5분 후)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Prisma의 upsert를 사용하여 기존 전화번호가 있으면 업데이트, 없으면 생성
    await this.prisma.user.upsert({
      where: {
        phoneNumber: phoneNum, // 이 필드를 기준으로 고유 여부 확인
      },
      update: {
        code: randomCode, // 기존 데이터가 있으면 코드와 만료 시간 업데이트
        expiresAt: expiresAt,
      },
      create: {
        phoneNumber: phoneNum, // 없으면 새로 생성
        code: randomCode,
        expiresAt: expiresAt,
      },
    });

    return randomCode;
  }

  async get(updatePhoneCheckDto: UpdatePhoneCheckDto): Promise<boolean> {
    const { phoneNum, codeNum } = updatePhoneCheckDto;

    // 데이터베이스에서 phoneNumber가 일치하는 레코드 검색
    const info = await this.prisma.user.findUnique({
      where: {
        phoneNumber: phoneNum,
      },
    });

    // 레코드가 없는 경우
    if (!info) {
      return false; //인증 실패
    }

    // 만료 시간 검사
    const currentTime = new Date();
    if (info.expiresAt < currentTime) {
      // 만료됬으면 isDeleted를 1로 업데이트
      await this.prisma.user.update({
        where: {
          phoneNumber: phoneNum,
        },
        data: {
          isDeleted: true, // isDeleted 값을 1로 설정
        },
      });
      return false; // 만료된 경우 인증 실패
    }

    // 코드가 일치하는지 확인
    if (info.code === codeNum) {
      return true; // 인증 성공
    } else {
      return false; // 인증 실패
    }
  }
}
