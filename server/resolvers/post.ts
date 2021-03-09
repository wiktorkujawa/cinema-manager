import {
  Arg,
  ID,
  // Arg,
  // Ctx,
  Field,
  // FieldResolver,
  InputType,
  Mutation,
  // Int,
  // ObjectType,
  Query,
  Resolver,
  // Root,
  // UseMiddleware,
} from "type-graphql";
// import { getConnection } from "typeorm";
import { Post } from "../entity/Post";

@InputType()
class PostInput {
  @Field()
  content: string;
}

// @ObjectType()
// class PaginatedPosts {
//   @Field(() => [Post])
//   posts: Post[];
//   @Field()
//   hasMore: boolean;
// }

@Resolver(Post)
export class PostResolver {
  // @FieldResolver(() => String)
  // textSnippet(@Root() post: Post) {
  //   return post.content.slice(0, 50);
  // }

  // @Query(() => PaginatedPosts)
  // async posts(
  //   @Arg("limit", () => Int) limit: number,
  //   @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  // ): Promise<PaginatedPosts> {
  //   // 20 -> 21
  //   const realLimit = Math.min(50, limit);
  //   const reaLimitPlusOne = realLimit + 1;

  //   const replacements: any[] = [reaLimitPlusOne];

  //   if (cursor) {
  //     replacements.push(new Date(parseInt(cursor)));
  //   }

  //   const posts = await getConnection().query(
  //     `
  //   select p.*
  //   from post p
  //   ${cursor ? `where p."createdAt" < $2` : ""}
  //   order by p."createdAt" DESC
  //   limit $1
  //   `,
  //     replacements
  //   );

    // const qb = getConnection()
    //   .getRepository(Post)
    //   .createQueryBuilder("p")
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
    //   .orderBy('p."createdAt"', "DESC")
    //   .take(reaLimitPlusOne);

    // if (cursor) {
    //   qb.where('p."createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }

    // const posts = await qb.getMany();
    // console.log("posts: ", posts);

  //   return {
  //     posts: posts.slice(0, realLimit),
  //     hasMore: posts.length === reaLimitPlusOne,
  //   };
  // }

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

    // return true
    // if(!post){
    //   return false;
    // }
    // await Post.remove(post);
    // return true;
  }
  

  // @Mutation(() => Post)
  // @UseMiddleware(isAuth)
  // async createPost(
  //   @Arg("input") input: PostInput,
  //   @Ctx() { req }: MyContext
  // ): Promise<Post> {
  //   return Post.create({
  //     ...input,
  //     creatorId: req.session.userId,
  //   }).save();
  // }

  // @Mutation(() => Post, { nullable: true })
  // @UseMiddleware(isAuth)
  // async updatePost(
  //   @Arg("id", () => Int) id: number,
  //   @Arg("content") content: string,
  //   @Arg("text") text: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<Post | null> {
  //   const result = await getConnection()
  //     .createQueryBuilder()
  //     .update(Post)
  //     .set({ content, text })
  //     .where('id = :id and "creatorId" = :creatorId', {
  //       id,
  //       creatorId: req.session.userId,
  //     })
  //     .returning("*")
  //     .execute();

  //   return result.raw[0];
  // }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async deletePost(
  //   @Arg("id", () => Int) id: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<boolean> {
    // not cascade way
    // const post = await Post.findOne(id);
    // if (!post) {
    //   return false;
    // }
    // if (post.creatorId !== req.session.userId) {
    //   throw new Error("not authorized");
    // }

    // await Updoot.delete({ postId: id });
    // await Post.delete({ id });

  //   await Post.delete({ id, creatorId: req.session.userId });
  //   return true;
  // }
}