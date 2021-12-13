import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('/signin')
    async signIn(
        @Body() body: SignInDTO
    ) {
        return this.authService.signIn(body);
    }

    @Post('/signup')
    async signUp(
        @Body() body: SignUpDTO,
    ) {
        return this.authService.signUp(body);
    }
}
