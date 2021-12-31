import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Payload } from 'src/auth/jwt/jwt.startegy';

@Injectable()
export class NoticeService {
    constructor() {}

    async createNotice(req: Request) {
        const user:Payload = req["user"];
        if (user.type === "USER") {
            throw new ForbiddenException();
        }
        return "Hello"
    }

    async getNoticeList() {
        return "HELLO"
    }
}
