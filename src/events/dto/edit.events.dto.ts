import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateEventsDto } from './create.events.dto';

export class UpdateStatusEventsDto {
    @IsString()
    status_event: string = 'Selesai';
}
