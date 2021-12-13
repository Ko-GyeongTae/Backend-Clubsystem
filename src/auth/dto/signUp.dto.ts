import { IsString } from "class-validator";

export type SignUpParam = 'USER' | 'ADMIN';

export class SignUpDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    cid: string;
}