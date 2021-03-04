import { Field, ObjectType } from "type-graphql";
import {Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @Field()
    @ObjectIdColumn()
    id: string;

    @Field()
    @Column()
    content: string;

    @Field()
    @Column()
    path: string;

    @Field()
    @Column()
    email: string;
    
    @Field()
    @Column()
    fileImage: boolean;
    
    @Field()
    @Column() 
    files_id: string;

    @Field()
    @Column()
    created_at: number;

    @Field()
    @Column()
    modified_at: number;
    
}
