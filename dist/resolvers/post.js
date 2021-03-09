"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
// import { getConnection } from "typeorm";
const Post_1 = require("../entity/Post");
let PostInput = class PostInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PostInput.prototype, "content", void 0);
PostInput = __decorate([
    type_graphql_1.InputType()
], PostInput);
// @ObjectType()
// class PaginatedPosts {
//   @Field(() => [Post])
//   posts: Post[];
//   @Field()
//   hasMore: boolean;
// }
let PostResolver = class PostResolver {
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
    posts() {
        // const postRepository = getRepository(Post);
        return Post_1.Post.find({});
    }
    post(id) {
        return Post_1.Post.findOne(id);
    }
    async createPost(input) {
        return Post_1.Post.create({
            ...input
        }).save();
    }
    async deletePost(id) {
        const post = await Post_1.Post.findOne(id);
        if (!post) {
            return false;
        }
        await Post_1.Post.remove(post);
        return true;
    }
    async updatePost(id, input) {
        const post = await Post_1.Post.findOne(id);
        if (!post)
            throw new Error("Post not found!");
        Object.assign(post, input);
        return post.save();
        // return true
        // if(!post){
        //   return false;
        // }
        // await Post.remove(post);
        // return true;
    }
};
__decorate([
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.Query(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
