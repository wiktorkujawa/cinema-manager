import { Field, ObjectType } from "type-graphql";
import {BaseEntity, Column, Entity,
  Index,
  //  ObjectIdColumn,
    OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Session } from "./Session";

@ObjectType()
@Entity()
export class Hall extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index({ unique: true })
  @Column()
  name: string;

  
  @OneToMany(() => Session, session => session.hall, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @Field(() => [Session])
  sessions: Session[];

}
