import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrdersDto {
    // @IsString()
    status: string;

    // @IsDate()
    waktu_pemesanan: Date;

    @IsNumber()
    kuantitas: number;
}