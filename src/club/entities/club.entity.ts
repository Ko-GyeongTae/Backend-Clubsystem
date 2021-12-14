import { Auth } from "src/auth/entities/auth.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(type => Auth, auth => auth.club, {
        onDelete: 'NO ACTION',
    })
    account?: Auth
}