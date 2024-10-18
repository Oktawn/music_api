import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";
import { randomBytes } from "crypto";

@Entity("users")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = randomBytes(20).toString('utf8');
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