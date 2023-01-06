import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PembayaranDto {
    @IsNotEmpty()
    @IsString()
    nama_pengirim: string;
    
    @IsNotEmpty()
    nominal: string;

    @IsNotEmpty()
    @IsString()
    bukti_pembayaran: string;


}