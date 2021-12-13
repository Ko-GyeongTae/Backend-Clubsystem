import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { NoticeModule } from './notice/notice.module';
import { VoteModule } from './vote/vote.module';
import { LetterModule } from './letter/letter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config'
import { Auth } from './auth/entities/auth.entity';
import { Club } from './club/entities/club.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [Auth, Club]
    }), 
    AuthModule, 
    ClubModule, 
    NoticeModule, 
    VoteModule, 
    LetterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
