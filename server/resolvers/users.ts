import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Users } from "../entity/Users";
// import passport from 'passport';
// import passportLocal from 'passport-local';
// const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { GMailService } from "../modules/nodemailer/mailer";

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
class RegisterInput {
  @Field()
  displayName: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  password2: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}


@Resolver(Users)
export class UserResolver {

  @Query(() => Users, { nullable: true })
    users(): Promise<Users[] | undefined>  {
      // const postRepository = getRepository(Post);
      return Users.find({});
    }

  @Query(() => Users, { nullable: true })
    async currentUser(@Ctx() context: any): Promise<Users | null>  {
      return context.getUser();
    }


  
  @Mutation(() => UserResponse)
    async register(
      @Arg("input") {displayName, email, password, password2}: RegisterInput): Promise<any>{
      let errors: any = [];
      if (!displayName || !email || !password || !password2) {
        errors.push({ 
          field: 'displayName || email || password || password2',
          message: 'Please enter all fields' });
      }
    
      if (password != password2) {
        errors.push({ 
          field:'password || password2',
          message: 'Passwords do not match' });
      }
    
      if (undefined !== password && password.length < 8) {
        errors.push({ 
          field: 'password',
          message: 'Password must be at least 8 characters' });
      }
    
      if (errors.length > 0) {
        return {errors: errors};
      } else {
        const users = await Users.findOne({ email: email });
          if (users) {
            errors.push({ 
              field: 'email',
              message: 'Email already exists' });
            return {errors: errors};
          } else {
            
                crypto.randomBytes(20,  (err, buf) => {
            
                  if(err){
                    console.log(err);
                  }
                  const activeToken = Date.now()+buf.toString('hex');
                  Users.create({
                    email: email,
                    displayName: displayName,
                    password: bcrypt.hashSync(password,10),
                    active: false,
                    activeToken: activeToken,
                    activeExpires: new Date(Date.now() + 24 * 3600 * 1000)
                  }).save();

                  let gmailService = new GMailService();
                  gmailService.sendMail(
                    email,
                    `Account Activation - ${process.env.PAGE_NAME}`,
                    `<p>Hello ${displayName},</p>
                    <p>Click the activation link, if you registered on ${process.env.PAGE_NAME} </p>
                    <a href='${process.env.PAGE_NAME}/account/active/${activeToken}'>${process.env.PAGE_NAME}/account/active/${activeToken}</a>
                    <p>Otherwise ignore it, link will expire after 24 hours.</p>`
                  );
            })
            return { errors: [{ message: 'Registration success. Check your email to activate account.' }]};
          }
    }
  }

  
  
  @Mutation(() => UserResponse)
  async login( @Arg("input") {email, password}: LoginInput, @Ctx() context:any): Promise<any>{
      // instead of email you can pass username as well
      const { user, info } = await context.authenticate("graphql-local", {
        email,
        password
      });

      await context.login(user);
      return {errors: [info]};
}

  @Mutation(() => Boolean)
  async logout(@Ctx() {req}: any): Promise<boolean> {
    return new Promise((resolve) =>
            req.session.destroy((err:any) => {
              if (err) {
                console.log(err);
                resolve(false);
                return;
              }
              req.logout();
              resolve(true);
            })
          );
  }


}
