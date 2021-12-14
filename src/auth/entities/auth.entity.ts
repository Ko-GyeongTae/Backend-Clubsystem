import { Club } from "src/club/entities/club.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => Club, club => club.accounts, {
        cascade: false
    })
    club: Club;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}