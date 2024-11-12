import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  NotificationsID: number;

  @Column()
  Content: string;

  @Column()
  Type: string;
}