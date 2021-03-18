import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Int,
  ObjectType,
} from "type-graphql";
import { Hall } from "../entity/Hall";

@InputType()
class HallInput {
  @Field()
  name: string;
}

@ObjectType()
class HallError {
  @Field()
  message: string;
}

@ObjectType()
class HallResponse {
  @Field(() => HallError, { nullable: true })
  errors?: HallError;
}

@Resolver(Hall)
export class HallResolver {
  @Query(() => [Hall], { nullable: true })
  async halls(): Promise<Hall[] | undefined> {
    return Hall.find({ relations: ["sessions"] });
  }

  @Query(() => Hall, { nullable: true })
  hall(@Arg("hallName", () => String) hallName: string): Promise<Hall | undefined> {
    return Hall.findOne({name:hallName}, { relations: ["sessions"] });
  }

  @Mutation(() => HallResponse)
  async createHall(@Arg("input") input: HallInput): Promise<HallResponse> {
    return Hall.create({
      ...input,
    }).save()
    .then(hall =>{
      return {
        errors:{
          message:`${hall.name} added to Hall list`
        }
      }
    })
    .catch(() => {
      return {
        errors:{
          message:'Hall with that name already exists'
        }
      }
    });
  }

  @Mutation(() => HallResponse)
  async deleteHall(@Arg("id", () => Int) id: number): Promise<HallResponse> {
    return Hall.delete(id)
      .then((success) => {
        if (success.affected == 0) {
          return {
            errors: {
              message: "Theres no such Hall",
            },
          };
        }
        return {
          errors: {
            message: "Hall removed",
          },
        };
      })
      .catch(() => {
        return {
          errors: {
            message: "Cant remove, Hall is not empty",
          },
        };
      });
  }

  @Mutation(() => Hall)
  async updateHall(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: HallInput
  ): Promise<Hall | null> {
    const hall = await Hall.findOne(id);
    if (!hall) throw new Error("Hall not found!");
    Object.assign(hall, input);
    return hall.save();
  }
}
