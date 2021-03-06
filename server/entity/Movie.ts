import { Field, ObjectType } from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Movie extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  Title: string;

  @Field()
  @Column()
  Description: string;

  @Field()
  @Column()
  Length: number;

  @Field()
  @Column()
  Poster: string;

}
