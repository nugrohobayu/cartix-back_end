import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class EditPasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(40)
    password: string;

    // @Match()
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(40)
    confirm_password: string;
}