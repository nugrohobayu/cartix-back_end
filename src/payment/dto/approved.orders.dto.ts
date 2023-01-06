import { IsString } from "class-validator";

export class ApprovedDto{
    @IsString()
    status: string = 'Approved';
}