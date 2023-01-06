import { IsNotEmpty, IsString } from "class-validator";

export class KategoriDto{

    @IsNotEmpty()
    @IsString()
    kategori: string;
    
    @IsNotEmpty()
    harga_tiket: number;

    @IsNotEmpty()
    jumlah_tiket: number;

}