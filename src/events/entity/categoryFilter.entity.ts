import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Events } from "./events.entity";

@Entity()
export class CategoryFilters {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    namaCategory: string

    @ManyToOne(() => Events, event => event.categoryFilter)
    event: Events

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