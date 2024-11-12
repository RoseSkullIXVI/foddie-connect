import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOfCuisine {
  @PrimaryGeneratedColumn()
  CuisineID: number;

  @Column()
  Type: string;
}
