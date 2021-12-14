import { Body, Controller, Delete, Get, NotAcceptableException, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
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

    @Delete('/')
    @UseGuards(JwtAuthGuard)
    async deleteClub(
        @Request() req: Req
    ) {
        const user = req["user"];
        
        if(user.type === 'ADMIN'){ // 수정해야함
            throw new NotAcceptableException();
        }
        
        return this.clubService.deleteClub(user);
    }
}
