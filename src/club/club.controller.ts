import { Controller, Get, Post } from '@nestjs/common';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
    constructor(private readonly clubService: ClubService) {}
    @Get('/list')
    async getClubList() {
        await this.clubService.getClubList();
    }
}
