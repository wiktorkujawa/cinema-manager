import { Field, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    displayName: string;

    @Field()
    @Column()
    image: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({default: false})
    active: boolean;

    @Field()
    @Column()
    activeToken: string;

    @Field()
    @Column()
    activeExpires: number;
}
