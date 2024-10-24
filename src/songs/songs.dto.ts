import { IsNotEmpty, IsString } from "class-validator";

export class SongSearchDto {


  genre?: string;

  @IsString()
  title?: string;

  @IsString()
  artist?: string;

}

export class SongSaveDto {
  userId: string;

  @IsString()
  @IsNotEmpty()
  songId: string;

}