import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/entities/song.entity';
import { PlaylistEntity } from 'src/entities/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity, PlaylistEntity])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule { }
