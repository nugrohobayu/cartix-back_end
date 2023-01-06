import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/payment/entity/order.entity';
import { Users } from 'src/users/entities/user.entity';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([Users, Orders])
],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
