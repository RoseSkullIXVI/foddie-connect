import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Review } from './Review.entity';
import { TypeOfReview } from './TypeOfReview.entity';

@Entity()
export class AppUsersRestaurantLikesBridge {
  @PrimaryColumn()
  ReviewID: number;

  @PrimaryColumn()
  ReviewTypeID: number;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'ReviewID' })
  review: Review;

  @ManyToOne(() => TypeOfReview)
  @JoinColumn({ name: 'ReviewTypeID' })
  typeofreview: TypeOfReview;
}
