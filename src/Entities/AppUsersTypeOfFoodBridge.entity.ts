import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsers } from './user.entity';
import { TypeOfFood } from './TypeOfFood.entity';

@Entity()
export class AppUsersTypeOfFoodBridge {
  @PrimaryColumn()
  AppUserID: number;

  @PrimaryColumn()
  FoodID: number;

  @ManyToOne(() => AppUsers)
  @JoinColumn({ name: 'AppUserID' })
  user: AppUsers;

  @ManyToOne(() => TypeOfFood)
  @JoinColumn({ name: 'FoodID' })
  food: TypeOfFood;
}
