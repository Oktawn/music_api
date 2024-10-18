import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RTokenEntity } from 'src/entities/r_token.entity';
import { Repository } from 'typeorm';
import { UserCreateDto, UserLoginDto } from './users.dto';
import { compareSync, hashSync } from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRep: Repository<UserEntity>,
    @InjectRepository(RTokenEntity) private rTokenRep: Repository<RTokenEntity>,
    private jwtService: JwtService) { }

  async signup(body: UserCreateDto) {
    const isMatch = await this.userRep.findOne({ where: { email: body.email, username: body.username } });

    if (isMatch.email === body.email) {
      throw new BadRequestException('Email already exists');
    }
    else if (isMatch.username === body.username) {
      throw new BadRequestException('Username already exists');
    }

    const hashPass = hashSync(body.password, 10);
    const user = this.userRep.create({ ...body, password: hashPass });
    await this.userRep.save(user);
  }


  async login(body: UserLoginDto) {
    const isUser = await this.userRep.findOne({ where: { email: body.email } });
    if (!isUser || !compareSync(body.password, isUser.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.generateTokens(isUser.id);
    return { ...tokens };
  }

  async generateTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = randomBytes(60).toString('utf-8');
    await this.saveRefreshToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }

  async getRefreshToken(refreshToken: string) {
    const rToken = await this.rTokenRep.findOne({ where: { token: refreshToken } });

    if (!rToken) {
      throw new BadRequestException('Invalid refresh token');
    }
    if (rToken.expiresAt < new Date()) {
      throw new BadRequestException('Refresh token expired');
    }
    return rToken;
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);

    const rToken = this.rTokenRep.create({ token: refreshToken, user: { id: userId }, expiresAt: expDate });
    this.rTokenRep.save(rToken);
  }


}
