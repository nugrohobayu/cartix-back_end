import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { BankPenyelenggara } from 'src/payment/entity/bankPenyelenggara.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Role, BankPenyelenggara])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
