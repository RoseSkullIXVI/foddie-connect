import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TypeOfCuisine } from './TypeOfCuisine.entity';

@Entity()
export class TypeOfFood {
  @PrimaryGeneratedColumn()
  FoodID: number;

  @Column()
  CuisineID: number;

  @ManyToOne(() => TypeOfCuisine)
  @JoinColumn({ name: 'CuisineID' })
  cuisine: TypeOfCuisine;

  @Column()
  Type: string;
}
