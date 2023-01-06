import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/events/entity/events.entity';
import { Kategori } from 'src/events/entity/kategori.entity';
import { Users } from 'src/users/entities/user.entity';
import { BankPenyelenggara } from './entity/bankPenyelenggara.entity';
import { Carts } from './entity/cart.entity';
import { Orders } from './entity/order.entity';
import { Pembayaran } from './entity/pembayaran.entity';
import { PaymentController } from './payment.controller';
import { CronPaymentService } from './payment.cron';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Pembayaran, BankPenyelenggara, Users, Events, Kategori, Carts])],
  controllers: [PaymentController],
  providers: [PaymentService, CronPaymentService]
})
export class PaymentModule {}
