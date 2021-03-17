import { Field, ObjectType } from "type-graphql";
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Hall } from "./Hall";

@ObjectType()
@Entity()
export class Session extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @ManyToOne(() => Hall, hall => hall.sessions)
  @Field(()=> Hall)
  hall: Hall;

  @Field()
  @Column()
  hallId: number;
  
}
