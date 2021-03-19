import { Field, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Users extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column({nullable:true})
    password: string;

    @Field()
    @Column()
    displayName: string;

    @Field()
    @Column({nullable:true})
    image: string;

    @Field()
    @Column({nullable:true})
    firstName: string;

    @Field()
    @Column({nullable:true})
    lastName: string;

    @Field()
    @Column({default: false})
    active: boolean;

    @Field()
    @Column({nullable:true})
    activeToken: string;

    @Field()
    @Column({nullable:true})
    activeExpires: Date;
}
