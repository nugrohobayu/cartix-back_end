import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
    // @IsNotEmpty()
    // @IsEmail()
    // email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(40)
    // @Matches(/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^-]).$/)
    password: string;
}