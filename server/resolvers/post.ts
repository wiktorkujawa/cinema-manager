import {
  Arg,
  ID,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Post } from "../entity/Post";

@InputType()
class PostInput {
  @Field()
  content: string;
}

@Resolver(Post)
export class PostResolver {

  @Query(() => [Post], { nullable: true })
  posts(): Promise<Post[] | undefined>  {
    // const postRepository = getRepository(Post);
    return Post.find({});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => ID) id: string): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: PostInput): Promise<Post>{
      return Post.create({
        ...input
      }).save();
    }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => ID) id: string): Promise<boolean> {
    const post = await Post.findOne(id);
    if(!post){
      return false;
    }
    await Post.remove(post);
    return true;
  }


  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => ID) id: string,
    @Arg("input") input: PostInput
    ): Promise<Post | null> {

      const post = await Post.findOne(id);
      if (!post) throw new Error("Post not found!");
      Object.assign(post, input);
      return post.save();

  }
  
}