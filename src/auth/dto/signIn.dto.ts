import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    password: string;j
}