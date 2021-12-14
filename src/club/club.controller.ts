import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDTO } from './dto/createClub.dto';

@Controller('club')
export class ClubController {
    constructor(private readonly clubService: ClubService) {}
    @Get('/list')
    async getClubList() {
        return await this.clubService.getClubList();
    }

    @Post('/')
    async createClub(
        @Body() body: CreateClubDTO
    ) {
        return await this.clubService.createClub(body);
    }
}
