import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { AppUsers } from './user.entity';

@Entity()
export class Credentials {
  @PrimaryColumn()
  Username: string;

  @Column()
  Password: string;

  @Column({ nullable: true })
  Token: string;

  @Column()
  salt: string;

  @Column()
  Email: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date;

  @Column()
  UserID: number;

  @OneToOne(() => AppUsers)
  @JoinColumn({ name: 'UserID' })
  user: AppUsers;
}