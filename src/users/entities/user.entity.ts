import { Events } from 'src/events/entity/events.entity';
import { BankPenyelenggara } from 'src/payment/entity/bankPenyelenggara.entity';
import { Carts } from 'src/payment/entity/cart.entity';
import { Orders } from 'src/payment/entity/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Users {
@PrimaryGeneratedColumn('uuid')
id_users: string;

@Column()
username: string;

  
@Column({nullable: true})
gambar: string;
  
@Column({unique: true})
email: string;
  
@Column()
password: string;
  
@Column()
hash: string;
  
@ManyToOne(
  () => {
    return Role;
  },
  (callBack) => {
    return callBack.id_role;
  }
)
role: number;

@OneToMany(() => BankPenyelenggara, bankPenyelenggara => bankPenyelenggara.users)
// @JoinColumn()
bankPenyelenggara: BankPenyelenggara;

@OneToMany(() => Events, events => events.users)
events: Events;

@OneToMany(() => Carts, cart => cart.user)
cart: Carts

@OneToMany(() => Orders, orders => orders.users)
orders: Orders;
  
@Column({unique: true})
no_telepon: string;
  
@Column({nullable: true})
alamat: string;
  
@Column({nullable: true})
jenis_kelamin: string;

@Column({type: 'date', nullable: true})
tanggal_lahir: Date;

@CreateDateColumn({
  type: 'timestamp',
  nullable: false,
})
createdAt: Date;

@UpdateDateColumn({
  type: 'timestamp',
  nullable: false,
})
updatedAt: Date;

@DeleteDateColumn({
  type: 'timestamp',
  nullable: true,
})
deletedAt: Date;
}
