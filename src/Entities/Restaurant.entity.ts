import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  RestaurantID: number;

  @Column({ nullable: true })
  Phone: number;

  @Column()
  Name: string;

  @Column({ nullable: true })
  Email: string;

  @Column()
  Location: string;

  @Column({ type: 'bytea', nullable: true })
  Picture: Buffer;

  @Column({ default: 0 })
  NumOfLike: number;
}