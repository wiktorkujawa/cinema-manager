import {
  Arg,
  Int,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ObjectType,
} from "type-graphql";
import { Hall } from "../entity/Hall";
import { Session } from "../entity/Session";

@InputType()
class SessionInput {

  @Field()
  name: string;
  @Field()
  hall: string;
  @Field()
  start_time: Date;
  @Field()
  duration: number;
  
}

@ObjectType()
class SessionError {
  @Field()
  message: string;
}

@ObjectType()
class SessionResponse {
  @Field(() => SessionError, { nullable: true })
  errors?: SessionError;
}

@Resolver(Session)
export class SessionResolver {

  @Query(() => [Session], { nullable: true })
  sessions(): Promise<Session[] | undefined>  {
    return Session.find({ relations:["hall"]});
  }

  @Query(() => Session, { nullable: true })
  session(@Arg("id", () => Int) id: number): Promise<Session | undefined> {
    return Session.findOne(id, {relations:["hall"]});
  }

  @Mutation(() => SessionResponse)
  async createSession(
    @Arg("input") input: SessionInput): Promise<SessionResponse>{
      const hall = await Hall.findOne({name: input.hall}, {relations:["sessions"]});
      let can_add=true;
      const start_time=input.start_time.getTime(); 
      const end_time= start_time+input.duration*60000;
      hall?.sessions.map(session =>{
        if(end_time>session.start_time.getTime() && start_time<session.end_time.getTime())
        { can_add=false } 
      })
      if(can_add){
        const session = new Session();
        session.name=input.name;

        session.start_time=input.start_time;
        
        session.end_time= new Date(end_time);
        await session.save();

        hall!.sessions.push(session);
        hall!.save();
        return {errors:{
          message: `Session ${input.name} added to ${input.hall}`
        }};
      }
      return {errors:{
        message: `Cant add session to ${input.hall} `
      }};
      
    }

  @Mutation(() => SessionResponse)
  async deleteSession(@Arg("id", () => Int) id: number): Promise<SessionResponse> {
    await Session.delete(id);
    return {errors:{
      message:"Session removed"
    }};
  }


  @Mutation(() => Session)
  async updateSession(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: SessionInput
    ): Promise<Session | null> {

      const session = await Session.findOne(id);
      if (!session) throw new Error("Session not found!");
      Object.assign(session, input);
      return session.save();

  }
  
}