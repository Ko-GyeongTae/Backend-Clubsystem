import { IsNumber, IsString } from "class-validator";
import { Club } from "src/club/entities/club.entity";
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
    club: string;
}