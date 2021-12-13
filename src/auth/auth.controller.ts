import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO, SignUpParam } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('/signin')
    async signIn(
        @Body() body: SignInDTO
    ) {
        return this.authService.signIn(body);
    }

    @Post('/signup/:type')
    async signUp(
        @Param('type') param: SignUpParam,
        @Body() body: SignUpDTO,
    ) {
        switch (param) {
            case 'USER':
                return this.authService.signUpUser(body);
            case 'ADMIN':
                return this.authService.signUpAdmin(body);
        }
    }
}
