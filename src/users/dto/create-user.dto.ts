import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
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
    @Type(() => Date)
    @IsDate()
    tanggal_lahir: string;
}