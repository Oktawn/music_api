import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity('refresh_token')
export class RTokenEntity {

  @PrimaryColumn()
  token: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column()
  expiresAt: Date;

}