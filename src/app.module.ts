import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { ArtistEntity } from './entities/artist.entity';
import { SongEntity } from './entities/song.entity';
import { PlaylistEntity } from './entities/playlist.entity';
import { RTokenEntity } from './entities/r_token.entity';
import { SongsModule } from './songs/songs.module';
config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.db_host,
    port: Number(process.env.db_port),
    username: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name,
    entities: [UserEntity, ArtistEntity, RTokenEntity, PlaylistEntity, SongEntity],
    synchronize: true
  }),
  JwtModule.register({
    global: true,
    secret: process.env.jwt_secret,
    signOptions: { expiresIn: '60m' }
  }),
    AuthModule,
    SongsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
