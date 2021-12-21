import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Payload } from 'src/auth/jwt/jwt.startegy';
import { Repository } from 'typeorm';
import { CreateClubDTO } from './dto/createClub.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(Club)
        private readonly clubRepository: Repository<Club>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ) { }

    public async getClub(cid: string) {
        return this.clubRepository.findOne({cid});
    }

    async getClubList() {
        const clublist = await this.clubRepository.findAndCount();

        if (!clublist[1]) {
            throw new NotFoundException();
        }

        return {
            totalCnt: clublist[1],
            data: clublist[0]
        }
    }

    async searchClub(param: string) {
        const club = await this.clubRepository.findOne({name: param});

        if (!club) {
            return {
                clubName: param,
                isExist: false
            }
        } else {
            return {
                clubName: param,
                isExist: true
            }
        }
    }

    async createClub(body: CreateClubDTO) {
        const { name, description } = body;

        const club = await this.clubRepository.findOne({
            where: {
                name
            },
            select: ["cid"],
        });

        if (club) {
            throw new PreconditionFailedException();
        }

        const createdClub = await this.clubRepository.create({
            name,
            description: description,
        })
            .save();
        return createdClub;
    }

    async deleteClub(user: Payload) {
        const userInfo = await this.authRepository.createQueryBuilder("auth")
            .innerJoinAndMapOne("auth.clubCid", Club, "club.cid")
            .where("auth.id = :id", { id: user.id })
            .getOne();

        await this.clubRepository.delete({cid: userInfo["clubCid"].cid})
        return userInfo;
    }
}
