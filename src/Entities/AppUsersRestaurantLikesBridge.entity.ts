import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsers } from './user.entity';
import { Restaurant } from './Restaurant.entity';

@Entity()
export class AppUsersRestaurantLikesBridge {
  @PrimaryColumn()
  AppUserID: number;

  @PrimaryColumn()
  RestaurantID: number;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'AppUserID' })
  user: AppUsers;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'RestaurantID' })
  restaurant: Restaurant;
}
