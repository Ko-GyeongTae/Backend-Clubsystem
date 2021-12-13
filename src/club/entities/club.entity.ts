import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    cid: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    total: number; 
}