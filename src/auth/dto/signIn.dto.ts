import { IsString } from 'class-validator';

export class SignInDTO {
    @IsString()
    id: string;

    @IsString()
    password: string;j
}