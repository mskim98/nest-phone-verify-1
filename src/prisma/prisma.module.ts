// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 다른 모듈에서 사용할 수 있도록 내보냄
})
export class PrismaModule {}
