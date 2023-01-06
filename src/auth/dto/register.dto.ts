import { IsDate, IsEmail, IsNotEmpty, IsNumber, isNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(13)
    no_telepon: string;

    @IsNotEmpty()
    @IsString()
    jenis_kelamin: string;

    @IsNotEmpty()
    // @IsString()
    tanggal_lahir: Date;

    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(40)
    // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/)
    password: string;

    // @IsString()
    // gambar: string;
}