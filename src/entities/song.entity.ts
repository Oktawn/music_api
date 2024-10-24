import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";
import { ArtistEntity } from "./artist.entity";
import { randomBytes } from "crypto";


@Entity("songs")
export class SongEntity {

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    generateId() {
        this.id = randomBytes(20).toString('hex');
    }

    @Column()
    title: string;

    @Column()
    path: string;

    @Column()
    duration: number;

    @Column('varchar', { array: true })
    genres: string[];

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs)
    playlists: PlaylistEntity

    

    @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
    artist: ArtistEntity;

}