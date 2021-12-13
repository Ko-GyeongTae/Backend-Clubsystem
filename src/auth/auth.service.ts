import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ){}
    public async findUserByUid(Uid: string){
        const user = await this.authRepository.findOne(Uid);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async signIn(body: SignInDTO){
        return 'sign in';
    }

    async signUpUser(body: SignUpDTO){
        return 'user';
    }
    
    async signUpAdmin(body: SignUpDTO){
        return 'admin';
    }
}