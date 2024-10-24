import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { SongEntity } from "./song.entity";
import { UserEntity } from "./user.entity";
import { randomBytes } from "crypto";


@Entity("playlists")
export class PlaylistEntity {

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    generateId() {
        this.id = randomBytes(20).toString('hex');
    }


    @Column({ nullable: false })
    name: string;

    @Column()
    description: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    author: UserEntity;

    @OneToMany(() => SongEntity, song => song.playlists)
    songs: SongEntity[];

    @OneToMany(() => UserEntity, user => user.playlists)
    users: UserEntity[]

}