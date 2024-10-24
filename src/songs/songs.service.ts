import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from 'src/entities/song.entity';
import { Repository } from 'typeorm';
import { SongSaveDto } from './songs.dto';
import { PlaylistEntity } from 'src/entities/playlist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity) private songsRep: Repository<SongEntity>,
    @InjectRepository(PlaylistEntity) private playRep: Repository<PlaylistEntity>
  ) { }

  async getMusicById(songId: string) {
    const isMatch = await this.songsRep.findOne({ where: { id: songId } });
    if (!isMatch)
      throw new BadRequestException('song not found');
    return isMatch;
  }

  async saveMusic(save: SongSaveDto) {
    const isMatch = await this.songsRep.findOne({ where: { id: save.songId } });
    if (!isMatch)
      throw new BadRequestException('song not found, doesn`t save');

    const Playlist = await this.playRep.findOne({ where: { users: { id: save.userId } } });

    if (Playlist.author.id !== save.userId)
      throw new BadRequestException("not rights")

    

  }
}
