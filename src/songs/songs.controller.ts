import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SongSaveDto, SongSearchDto } from './songs.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Get('search')
  async getMusicByCriteria(@Body() body: SongSearchDto) {
    return this.songsService.getMusicByCriteria(body);
  }

  @Get(':id')
  async getMusicById(@Param() id: string) {
    return this.songsService.getMusicById(id);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  async saveMusic(@Req() req, @Param() id: string) {
    const save: SongSaveDto = {
      userId: req.userId,
      songId: id
    }
    return this.songsService.saveMusic(save);
  }

}
