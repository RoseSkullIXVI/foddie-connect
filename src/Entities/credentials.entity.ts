import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { AppUsers } from './user.entity';

@Entity()
export class Credentials {
  @PrimaryColumn()
  Username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  Token: string;

  @Column()
  salt: string;

  @Column()
  Email: string;

  @Column()
  UserID: number;

  @OneToOne(() => AppUsers)
  @JoinColumn({ name: 'UserID' })
  user: AppUsers;
}