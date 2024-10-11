import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneCheckDto } from './create-phone-check.dto';
import {
  IsNotEmpty,
  IsPhoneNumber,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class CodeValidator implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return value.length == 6;
  }
  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return '옳지 않은 형식의 코드입니다.';
  }
}

function IsCodeValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CodeValidator,
    });
  };
}

export class UpdatePhoneCheckDto extends PartialType(CreatePhoneCheckDto) {
  @IsPhoneNumber('KR')
  @IsNotEmpty()
  phoneNum: string;

  @IsCodeValid()
  @IsNotEmpty()
  codeNum: string;
}
