import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { NoticeModule } from './notice/notice.module';
import { VoteModule } from './vote/vote.module';
import { LetterModule } from './letter/letter.module';

@Module({
  imports: [AuthModule, ClubModule, NoticeModule, VoteModule, LetterModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
