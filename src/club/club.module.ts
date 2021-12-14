import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Club, Auth])
  ],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService]
})
export class ClubModule {}
