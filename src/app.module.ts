import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { HttpLoggerMiddleware } from './middleware/http.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
