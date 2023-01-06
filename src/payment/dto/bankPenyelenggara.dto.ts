import { IsNotEmpty, IsString } from "class-validator";

export class BankPenyelenggaraDto {
    @IsString()
    @IsNotEmpty()
    nama_bank: string;

    @IsNotEmpty()
    @IsString()
    atas_nama: string;

    @IsString()
    @IsNotEmpty()
    bank_akun: string;
}