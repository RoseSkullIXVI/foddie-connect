import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RestaurantLike {
  @IsNotEmpty() 
  @IsString()
  name: string;

  @IsNotEmpty() 
  @IsNumber()
  AppUserID: number;

  @IsNotEmpty() 
  @IsString()
  location : string;

  @IsString()
  categories: string[];

  @IsString()
  typeOf : string;
}