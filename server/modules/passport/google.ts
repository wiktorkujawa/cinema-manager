import passportGoogle from 'passport-google-oauth20';
const GoogleStrategy = passportGoogle.Strategy;
import {Users} from "../../entity/Users";

import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname,'../../../.env' )});


module.exports = (passport: any) => {  
  passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: '/auth/google/callback',
          proxy: true
        },
        async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
          const newUser = {
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          }

          try {
            let users = await Users.findOne({ email: profile.emails[0].value })

            if (users) {
              done(null, users)
            } else {
              users = await Users.create(newUser).save();
              done(null, users)
            }
          } catch (err) {
            console.error(err)
          }
        }
      )
    )

    passport.serializeUser( function (users: any, done: any) {
      done(null, users.email);
    });
    
    passport.deserializeUser( async (email: any, done: any) => {
      Users.findOne({email: email})
      .then(users => done(null, users))
      .catch(error => done(error ,false))
    });
    
}