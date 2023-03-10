import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id_role: number;

    @Column()
    role_name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(
        () => {
            return Users;
        },
        (callBack) => {
            return callBack.id_users
        }
    )
    users: Users
}