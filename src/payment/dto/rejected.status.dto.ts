import { IsString } from "class-validator";

export class RejectedStatusDto{
    @IsString()
    status: string = 'Rejected'
}