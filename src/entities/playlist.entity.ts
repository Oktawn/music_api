import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SongEntity } from "./song.entity";
import { UserEntity } from "./user.entity";
import { ArtistEntity } from "./artist.entity";
import { randomBytes } from "crypto";


@Entity("playlists")
export class PlaylistEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @BeforeInsert()
    generateId() {
        this.id = randomBytes(20).toString('utf8');
    }


    @Column()
    name: string;

    @Column()
    description: string;


    @ManyToOne(() => ArtistEntity, artist => artist.playlists)
    artist: ArtistEntity;


    @OneToMany(() => SongEntity, song => song.playlists)
    songs: SongEntity[];


    @ManyToMany(() => UserEntity, user => user.playlists)
    users: UserEntity[]

}