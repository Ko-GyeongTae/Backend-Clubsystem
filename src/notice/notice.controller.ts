import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { NoticeService } from './notice.service';
import { Request } from 'express';

@Controller('notice')
export class NoticeController {
    constructor(
        private noticeService: NoticeService,
    ) { }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    createNotice(
        @Req() req: Request,
    ) {
        return this.noticeService.createNotice(req);
    }

    @Get('/')
    getNoticeList() {
        return this.noticeService.getNoticeList();
    }
}
