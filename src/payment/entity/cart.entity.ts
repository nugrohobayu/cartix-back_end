import { Events } from "src/events/entity/events.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Orders } from "./order.entity";

@Entity()
export class Carts{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Users, user => user.cart)
    user: Users

    @ManyToOne(() => Orders, order => order.cart)
    order: Orders

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