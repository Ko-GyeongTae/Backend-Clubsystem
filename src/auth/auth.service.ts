import { BadRequestException, HttpException, HttpStatus, Injectable, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Club } from 'src/club/entities/club.entity';
import { Payload } from 'src/auth/jwt/jwt.startegy';
import { JwtService } from '@nestjs/jwt';

const HASH_LENGTH = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly jwtService: JwtService
    ){}
    public async findUserById(id: string){
        const user = await this.authRepository.findOne({id});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    public async validateExistAccount(param: { id: string }){
        const { id } = param;

        const account = await this.authRepository.findOne({
            where: {
                id
            },
            select: ['uid'],
        })

        if(account){
            return [
                HttpStatus.PRECONDITION_FAILED,
                'Same account is already exist'
            ];
        }
        return [];
    }

    async signIn(param: object, body: SignInDTO){
        const { id, password } = body;
        console.log(param, body);
        let user = null;
        switch(param["type"]){
            case 'admin':
                user = await this.authRepository.findOne({id});
            case 'user':
                user = await this.authRepository.findOne({id});
        }
        
        if (!user) {
            throw new PreconditionFailedException('Wrong ID or PW');
        }

        const isVerified = await bcrypt.compare(password, user?.password);
        if (!isVerified) {
            throw new PreconditionFailedException('Wrong ID or PW');
        }
        const { name, studentno, type, club } = user;

        const accessToken = this.jwtService.sign({ id, name, studentno, type, club });
        return { 
            "accessToken": accessToken
        }
    }

    async signUp(body: SignUpDTO){
        const { id, name, password, studentno, type } = body;

        const result = await this.validateExistAccount({id});

        if(result.length) {
            throw new HttpException(
                {
                    status: result[0],
                    message: result[1],
                },
                result[0] as HttpStatus
            )
        }

        const hash = await bcrypt.hash(password, HASH_LENGTH);

        await this.authRepository.create({
            id,
            name,
            type,
            studentno,
            password: hash
        })
        .save();
    }

    async dropOut(user: Payload) {
        return 'drop out';
    }

    async validateType(user: Payload) {
        return {
            "type": user.type,
        }
    }
}