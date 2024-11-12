import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsers } from './user.entity';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn()
  AuditID: number;

  @Column()
  Action: string;

  @Column({ type: 'timestamp' })
  DateTime: Date;

  @Column()
  Description: string;

  @Column()
  AppUserId: number;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'AppUserId' })
  user: AppUsers;
}
