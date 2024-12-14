import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class Review {
    @IsNotEmpty()
    @IsNumber()
    AppUserID: number;
    
    @IsNotEmpty()
    @IsNumber()
    RestaurantID : number;

    @IsNotEmpty()
    @IsNumber()
    @IsArray()
    ReviewTypes: number [];

    @IsDateString()
    ReviewDate : Date;
}