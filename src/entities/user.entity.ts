import { BeforeInsert, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";
import { randomBytes } from "crypto";

@Entity("users")
export class UserEntity {

  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = randomBytes(20).toString('hex');
  }

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => PlaylistEntity, playlist => playlist.users)
  playlists: PlaylistEntity[]
}