import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BankPenyelenggara } from "./bankPenyelenggara.entity";
import { Orders } from "./order.entity";

@Entity()
export class Pembayaran {
    @PrimaryGeneratedColumn('uuid')
    id_pembayaran: string;

    @Column()
    nama_pengirim: string;

    @Column()
    nominal: string;

    @Column({
        type: 'timestamp',
        nullable: false,
    })
    waktu_pembayaran: Date;

    @Column()
    bukti_pembayaran: string;

    @ManyToOne(() => Orders, orders => orders.pembayaran)
    @JoinColumn()
    orders: Orders;

    @OneToOne(() => BankPenyelenggara, bankPenyelenggara => bankPenyelenggara.pembayaran)
    @JoinColumn()
    bankPenyelenggara: BankPenyelenggara;
    
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