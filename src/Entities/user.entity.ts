import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('appusers')
export class AppUsers {
  @PrimaryGeneratedColumn('increment')
  AppUserId: number;

  @Column()
  FullName: string;

  @Column({nullable: true })
  PhoneName: string;

  @Column({ type: 'bytea', nullable: true })
  ProfilePicture: Buffer;

  @Column({nullable: true })
  City: string;

  @Column({nullable: true})
  NotifToken: string;

  @Column({ nullable: true })
  Bio: string;
}