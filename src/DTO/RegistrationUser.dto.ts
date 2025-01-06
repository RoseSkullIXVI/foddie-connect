import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}


