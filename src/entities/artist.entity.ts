import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { SongEntity } from "./song.entity";
import { PlaylistEntity } from "./playlist.entity";
import { randomBytes } from "crypto";


@Entity('artist')
export class ArtistEntity {

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    generateId() {
        this.id = randomBytes(20).toString('hex');
    }

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text' })
    bio: string;

    @OneToMany(() => SongEntity, song => song.artist)
    songs: SongEntity[]

    @OneToMany(() => PlaylistEntity, playlist => playlist.artist)
    playlists: PlaylistEntity[]
}