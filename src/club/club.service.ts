import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { CreateClubDTO } from './dto/createClub.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(Club)
        private readonly clubRepository: Repository<Club>
    ){}
    async getClubList() {
        const clublist = await this.clubRepository.findAndCount();

        if(!clublist[1]) {
            throw new NotFoundException();
        }

        return {
            totalCnt: clublist[1],
            data: clublist[0]
        }
    }

    async createClub(body: CreateClubDTO) {
        const { name, description, totalCnt } = body;

        const club = await this.clubRepository.findOne({
            where: { 
                name 
            },
            select: ["cid"],
        });

        if(club){
            throw new PreconditionFailedException();
        }

        await this.clubRepository.create({
            name,
            description,
            total: totalCnt,
        })
        .save();
    }
}
