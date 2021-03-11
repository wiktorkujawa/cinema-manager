import { Field, ObjectType } from "type-graphql";
import {Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @ObjectIdColumn()
    id: string;

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
