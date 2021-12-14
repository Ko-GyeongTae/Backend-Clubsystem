import { Auth } from "src/auth/entities/auth.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Club extends BaseEntity {
    @PrimaryGeneratedColumn()
    cid: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    total: number; 

    @OneToMany(() => Auth, auth => auth.club, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    accounts?: Auth[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}