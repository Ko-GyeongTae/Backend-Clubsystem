import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

const HASH_LENGTH = 20;

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

    public async validateExistAccount(param: { id: string }){
        const { id } = param;

        const account = await this.authRepository.find({
            where: {
                id
            },
            select: ['uid'],
        })

        if(!account){
            return [
                HttpStatus.PRECONDITION_FAILED,
                'Same account is already exist'
            ];
        }
    }

    async signIn(body: SignInDTO){
        return body;
    }

    async signUp(body: SignUpDTO){
        const { id, name, password, cid, type } = body;

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

        this.authRepository.create({
            id,
            name,
            type,
            password: hash,
        })
        .save();
    }
}