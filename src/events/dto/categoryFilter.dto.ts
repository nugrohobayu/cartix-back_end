import { IsString } from "class-validator";

export class CategoryFiltersDto {
    @IsString()
    namaCategory: string
}