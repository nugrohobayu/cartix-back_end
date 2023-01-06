import { IsNumber, IsString } from "class-validator";

export class UlasanDto {
    @IsString()
    komentar: string;

    @IsNumber()
    rating: number;
}