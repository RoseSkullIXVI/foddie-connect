import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn('increment')
  NotificationsID: number;

  @Column()
  Content: string;

  @Column()
  Type: string;
}