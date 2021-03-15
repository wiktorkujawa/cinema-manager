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
  start_time: Date;

  @Field()
  @Column()
  end_time: Date;

  @ManyToOne(() => Hall, hall => hall.sessions)
  @Field(()=> Hall)
  hall: Hall;
  
}
