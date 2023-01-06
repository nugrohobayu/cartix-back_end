import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Events } from "./events.entity";

@Entity()
export class Rekomendasi {
    @PrimaryGeneratedColumn('uuid')
    id_rekomendasi: string;

    @OneToOne(()=> Events, events => events.rekomendasi)
    @JoinColumn()
    events: Events;

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