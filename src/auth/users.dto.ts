import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class UserCreateDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class UserLoginDto extends OmitType(UserCreateDto, ['username']) {

}