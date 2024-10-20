import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";
import { ArtistEntity } from "./artist.entity";
import { randomBytes } from "crypto";


@Entity("songs")
export class SongEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @BeforeInsert()
    generateId() {
        this.id = randomBytes(20).toString('utf8');
    }

    @Column()
    title: string;

    @Column()
    album: string;

    @Column('varchar', { array: true })
    genres: string[];

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs)
    playlists: PlaylistEntity

    @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
    artist: ArtistEntity;

}