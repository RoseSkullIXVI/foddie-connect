import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RestaurantTypeOfCuisineBridge } from './RestaurantTypeOfCuisineBridge.entity';

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


  @OneToMany(() => RestaurantTypeOfCuisineBridge, (cuisineBridge) => cuisineBridge.restaurant)
  cuisineBridge: RestaurantTypeOfCuisineBridge[];
}