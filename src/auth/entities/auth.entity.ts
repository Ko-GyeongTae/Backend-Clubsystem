import { Club } from "src/club/entities/club.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserType {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

@Entity()
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    uid: string;

    @Column({ unique: true })
    id: string;

    @Column()
    name: string;

    @Column()
    studentno: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    nfcid: string;

    @Column({ type: "enum", enum: UserType })
    type: keyof typeof UserType;

    @OneToOne(type => Club, club => club.account, {
        cascade: false
    })
    @JoinColumn()
    club: Club;
}