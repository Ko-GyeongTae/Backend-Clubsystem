import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    password: string;j
}