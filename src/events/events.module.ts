import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { Events } from './entity/events.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/users/entities/role.entity';
import { Ulasan } from './entity/ulasan.entity';
import { CronService } from './cron';
import { Users } from 'src/users/entities/user.entity';
import { Orders } from 'src/payment/entity/order.entity';
import { Rekomendasi } from './entity/rekomendasi.entity';
import { Kategori } from './entity/kategori.entity';
import { CategoryFilters } from './entity/categoryFilter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Role, Users, Ulasan, Orders, Rekomendasi, Kategori, CategoryFilters])],
  providers: [CronService, EventService],
  controllers: [EventController]
})
export class EventsModule {}
