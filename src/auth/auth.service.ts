import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Club } from 'src/club/entities/club.entity';

const HASH_LENGTH = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(Club)
        private readonly clubRepository: Repository<Club>
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

    async signIn(body: SignInDTO){
        return body;
    }

    async signUp(body: SignUpDTO){
        const { id, name, password, cid, studentno, type } = body;

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

        const club = await this.clubRepository.findOne({cid});

        const user = await this.authRepository.create({
            id,
            name,
            type,
            studentno,
            club,
            password: hash
        })
        .save();
    }
}