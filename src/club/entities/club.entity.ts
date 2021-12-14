import { Auth } from "src/auth/entities/auth.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        onDelete: 'NO ACTION',
    })
    accounts?: Auth[]
}