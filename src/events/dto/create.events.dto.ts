import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEventsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nama_event: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nama_penyelenggara: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    alamat: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    deskripsi: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(250)
    detail: string;

    @IsNotEmpty()
    @IsString()
    banner_event: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    tanggal_event: Date;

    @IsNotEmpty()
    @IsString()
    waktu_event: string;

    // @IsNotEmpty()
    status_event: string;

}