// import passportLocal from 'passport-local';
// const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcryptjs';
import { GraphQLLocalStrategy} from 'graphql-passport';
import {User} from "../../entity/User";


module.exports =
  (passport: any) => {
    passport.use(
      new GraphQLLocalStrategy( async (email: any, password: any, done: any) => {
        const user = await User.findOne({ email: email });
              if (!user) {
                  return done(new Error("Incorrect username"), false);
              }
              if(!user.active) {
                return done(new Error("Account not activated yet, check your email"), false);
              }
              if (!bcrypt.compareSync(password, user.password)) {
                  return done(new Error("Incorrect password"), false);
              }
              return done(null, user, { 
                message: 'You have been logged in'});
          })
    );

    // passport.serializeUser( function (user: any, done: any) {
    //   if(!user){
    //     return done(null, false);
    //   }
    //   return done(null, user.email);
    // });
    
    // passport.deserializeUser( (email: any, done: any) => {
    //   User.findOne({email:email})
    //   .then( ( user: any) => {
    //     done(null, user);
    //   })
    //   .catch(error => {
    //     done(error,false);
    //   });
    // });
  }
