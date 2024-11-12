import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOfReview {
  @PrimaryGeneratedColumn()
  ReviewTypeID: number;

  @Column()
  Type: string;

  @Column()
  Description: string;
}
