import { BadRequestException, HttpException, HttpStatus, Injectable, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { Auth, UserType } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/jwt/jwt.startegy';
import { JwtService } from '@nestjs/jwt';
import { ClubService } from '../club/club.service';

const HASH_LENGTH = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly jwtService: JwtService,
        private readonly clubService: ClubService,
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
                user = await this.authRepository.findOne({id, type: param["type"]});
            case 'user':
                user = await this.authRepository.findOne({id, type: param["type"]});
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
        const { id, name, password, studentno, club } = body;
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
        
        let clubObj = await this.clubService.getClub(club);
        const hash = await bcrypt.hash(password, HASH_LENGTH);
        
        const user = new Auth 
        user.id = id;
        user.name = name;
        user.studentno = studentno;
        user.type = 'USER';
        user.password = hash;
        user.club = clubObj;
        
        if (!clubObj) {
            user.type = 'ADMIN';
            user.club = await this.clubService.createClub({ name: club });
        }
        await getConnection().manager.save(user);
    }

    async dropOut(user: Payload) {
        await this.authRepository.delete({id: user.id});
        return;
    }

    async validateType(user: Payload) {
        return {
            "type": user.type,
        }
    }
}