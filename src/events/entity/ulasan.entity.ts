import { Orders } from "src/payment/entity/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Events } from "./events.entity";

@Entity()
export class Ulasan {
    @PrimaryGeneratedColumn('uuid')
    id_ulasan: string;

    @ManyToOne(() => Orders, (orders) => orders.ulasan)
    orders: Orders;

    @ManyToOne(() => Events, events => events.ulasan)
    events: Events;

    @Column()
    komentar: string;

    @Column()
    rating: number;

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