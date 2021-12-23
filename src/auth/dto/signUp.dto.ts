import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    studentno: string;

    @IsNotEmpty()
    @IsString()
    club: string;
}