import { IsString } from "class-validator";
import { UserType } from "../entities/auth.entity";

export class SignUpDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
    
    @IsString()
    studentno: string;

    @IsString()
    type: UserType;

    @IsString()
    cid: string;
}