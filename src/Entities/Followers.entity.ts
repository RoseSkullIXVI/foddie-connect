import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsers } from './user.entity';

@Entity()
export class Followers {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  FollowerID: number;

  @Column()
  FollowingID: number;

  @Column({ type: 'date' })
  FollowAt: Date;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'FollowerID' })
  follower: AppUsers;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'FollowingID' })
  following: AppUsers;
}
