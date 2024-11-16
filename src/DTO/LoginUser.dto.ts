import { IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}