import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePhoneCheckDto {
  @IsPhoneNumber('KR')
  @IsString()
  @IsNotEmpty()
  phoneNum: string;
}
