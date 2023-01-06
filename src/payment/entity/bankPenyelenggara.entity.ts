import { Users } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pembayaran } from "./pembayaran.entity";

@Entity()
export class BankPenyelenggara {
    @PrimaryGeneratedColumn('uuid')
    id_bank_penyelenggara;

    
    @OneToOne(() => Pembayaran, pembayaran => pembayaran.bankPenyelenggara)
    pembayaran: Pembayaran;
    
    @Column()
    nama_bank: string;
    
    @Column()
    bank_akun: string;
    
    @Column()
    atas_nama: string;

    @ManyToOne(() => Users, users => users.bankPenyelenggara)
    @JoinColumn()
    users: Users;

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