import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RTokenEntity } from 'src/entities/r_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RTokenEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
