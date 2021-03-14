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
  name: string;

  @Field()
  @Column()
  start_time: string;

  @Field()
  @Column()
  end_time: string;

  @ManyToOne(() => Hall, hall => hall.sessions)
  @Field(()=> Hall)
  hall: Hall;
  
}
