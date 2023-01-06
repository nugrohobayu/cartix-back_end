import { Orders } from "src/payment/entity/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Events } from "./events.entity";

@Entity()
export class Kategori{
    @PrimaryGeneratedColumn('uuid')
    id_kategori: string;

    @Column()
    kategori: string;

    @Column()
    harga_tiket: number;

    @Column()
    jumlah_tiket: number;
    
    @ManyToOne(() => Events, events => events.kategori)
    @JoinColumn()
    events: Events;

    @OneToMany(() => Orders, orders => orders.kategori)
    orders: Orders;

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