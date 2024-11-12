import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class AppUsers {
  @PrimaryGeneratedColumn()
  AppUserId: number;

  @Column()
  FullName: string;

  @Column()
  PhoneName: string;

  @Column({ type: 'bytea', nullable: true })
  ProfilePicture: Buffer;

  @Column()
  City: string;

  @Column({ nullable: true })
  Bio: string;
}