import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
