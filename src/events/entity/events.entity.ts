import { 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  JoinColumn, 
  JoinTable, 
  ManyToMany, 
  ManyToOne, 
  OneToMany, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Users } from "src/users/entities/user.entity";
import { Orders } from "src/payment/entity/order.entity";
import { Rekomendasi } from "./rekomendasi.entity";
import { Kategori } from "./kategori.entity";
import { Ulasan } from "./ulasan.entity";
import { CategoryFilters } from "./categoryFilter.entity";

@Entity()
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id_events: string;

  @Column()
  nama_event: string;

  @Column()
  nama_penyelenggara: string;

  @Column({type: 'date', nullable: true})
  tanggal_event: Date;

  
  @Column()
  waktu_event: string;

  @Column({nullable: false})
  alamat: string;

  @Column()
  deskripsi: string;
    
  @Column()
  detail: string;

  @Column({nullable: true})
  banner_event: string;

  @Column({
    type: 'enum',
    enum: ['Aktif','Selesai'],
    default: 'Aktif'
  })
  status_event: string;

  @ManyToOne(() => Users, users => users.events)
  users: Users;

  @OneToMany(() => Kategori, kategori => kategori.events)
  kategori: Kategori[];

  @OneToMany(() => Orders, orders => orders.events)
  orders: Orders[];

  @OneToOne(() => Rekomendasi, rekomendasi => rekomendasi.events)
  rekomendasi: Rekomendasi;

  @ManyToOne(() => Ulasan, ulasan => ulasan.events)
  ulasan: Ulasan;

  @OneToMany(() => CategoryFilters, categoryFilter => categoryFilter.event)
  categoryFilter: CategoryFilters

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