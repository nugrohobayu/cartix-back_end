import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get('send/:id_users/:id_orders')
    email(
        @Param('id_users', ParseUUIDPipe) id_users: string,
        @Param('id_orders') id_orders: string
    ) {
        return this.emailService.email(id_users, id_orders)
    }
}
