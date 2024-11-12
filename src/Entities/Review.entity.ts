import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsers } from './user.entity';
import { Restaurant } from './Restaurant.entity';
import { TypeOfReview } from './TypeOfReview.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  ReviewID: number;

  @Column()
  AppUserID: number;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'AppUserID' })
  user: AppUsers;

  @Column()
  RestaurantID: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'RestaurantID' })
  restaurant: Restaurant;

  @Column({ type: 'timestamp' })
  ReviewDate: Date;

  @Column()
  ReviewTypeID: number;

  @ManyToOne(() => TypeOfReview)
  @JoinColumn({ name: 'ReviewTypeID' })
  reviewType: TypeOfReview;

  @Column({ type: 'boolean' })
  IsPositive: boolean;
}
