import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TypeOfCuisine } from './TypeOfCuisine.entity';
import { Restaurant } from './Restaurant.entity';


@Entity()
export class RestaurantTypeOfCuisineBridge {

    @PrimaryColumn()
    RestaurantID: number;
  
    @PrimaryColumn()
    CuisineID: number;
  
    @ManyToOne(() => Restaurant)
    @JoinColumn({ name: 'RestaurantID' })
    restaurant: Restaurant;
  
    @ManyToOne(() => TypeOfCuisine)
    @JoinColumn({ name: 'CuisineID' })
    cuisine: TypeOfCuisine;
}