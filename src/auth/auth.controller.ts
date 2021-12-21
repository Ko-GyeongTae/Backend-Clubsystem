import { Body, Controller, Param, Get, Post, Request, Delete, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('/signin/:type')
    async signIn(
        @Param() param: object,
        @Body() body: SignInDTO
    ) {
        return this.authService.signIn(param, body);
    }

    @Post('/signup')
    async signUp(
        @Body() body: SignUpDTO,
    ) {
        return this.authService.signUp(body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/dropout')
    async dropout(
        @Request() req: Req,
    ) {
        const user = req["user"];

        return this.authService.dropOut(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/type')
    async validateType(
        @Request() req: Req,
    ) {
        const user = req["user"];

        return this.authService.validateType(user);
    }
}
