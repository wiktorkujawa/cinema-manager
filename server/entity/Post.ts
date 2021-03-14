import { Field, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    content: string;
    
}
