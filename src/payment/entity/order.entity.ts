import { Events } from "src/events/entity/events.entity";
import { Kategori } from "src/events/entity/kategori.entity";
import { Ulasan } from "src/events/entity/ulasan.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Carts } from "./cart.entity";
import { Pembayaran } from "./pembayaran.entity";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('increment')    
    id_orders: string;

    @Column({
        type: 'enum',
        enum: ["Dipesan","Approved","Rejected"],
        default: 'Dipesan'
    })
    status: string;

    @Column({
        type: 'timestamp',
    })
    waktu_pemesanan: Date;

    @Column()
    kuantitas: number;

    @Column()
    total_harga: number;

    @ManyToOne(() => Events, events => events.orders)
    @JoinColumn()
    events: Events;

    @OneToMany(() => Pembayaran, pembayaran => pembayaran.orders)
    // @JoinColumn()
    pembayaran: Pembayaran[];

    @ManyToOne(() => Kategori, kategori => kategori.orders)
    kategori: Kategori;

    @ManyToOne(() => Users, users => users.orders)
    users: Users;

    @OneToMany(() => Ulasan, ulasan => ulasan.orders)
    ulasan: Ulasan;

    @OneToMany(() => Carts, cart => cart.order)
    cart: Carts;

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