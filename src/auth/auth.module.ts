import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { JwtStrategy } from './jwt/jwt.startegy';
import { JwtModule } from '@nestjs/jwt';
import { ClubModule } from 'src/club/club.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Club]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.STAGE === 'dev' ? '1y' : '5d',
      },
    }),
    ClubModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
