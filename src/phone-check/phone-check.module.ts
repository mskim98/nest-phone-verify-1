import { Module } from '@nestjs/common';
import { PhoneCheckService } from './phone-check.service';
import { PhoneCheckController } from './phone-check.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhoneCheckController],
  providers: [PhoneCheckService],
})
export class PhoneCheckModule {}
