import { IsString } from "class-validator";

export type UserType = 'user' | 'admin';

export class SignUpDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    type: UserType;

    @IsString()
    cid: string;
}