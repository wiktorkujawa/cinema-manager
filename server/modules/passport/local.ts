// import passportLocal from 'passport-local';
// const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcryptjs';
import { GraphQLLocalStrategy} from 'graphql-passport';
import {Users} from "../../entity/Users";


module.exports =
  (passport: any) => {
    passport.use(
      new GraphQLLocalStrategy( async (email: any, password: any, done: any) => {
        const users = await Users.findOne({ email: email });
              if (!users) {
                  return done(new Error("Incorrect username"), false);
              }
              if(!users.active) {
                return done(new Error("Account not activated yet, check your email"), false);
              }
              if (!bcrypt.compareSync(password, users.password)) {
                  return done(new Error("Incorrect password"), false);
              }
              return done(null, users, { 
                message: 'You have been logged in'});
          })
    );

    // passport.serializeUser( function (users: any, done: any) {
    //   if(!users){
    //     return done(null, false);
    //   }
    //   return done(null, users.email);
    // });
    
    // passport.deserializeUser( (email: any, done: any) => {
    //   Users.findOne({email:email})
    //   .then( ( users: any) => {
    //     done(null, users);
    //   })
    //   .catch(error => {
    //     done(error,false);
    //   });
    // });
  }
