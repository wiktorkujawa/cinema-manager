import passportGoogle from 'passport-google-oauth20';
const GoogleStrategy = passportGoogle.Strategy;
import {User} from "../../entity/User";

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
            let user = await User.findOne({ email: profile.emails[0].value })

            if (user) {
              done(null, user)
            } else {
              user = await User.create(newUser).save();
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
        }
      )
    )

    passport.serializeUser( function (user: any, done: any) {
      done(null, user.email);
    });
    
    passport.deserializeUser( async (email: any, done: any) => {
      User.findOne({email: email})
      .then(user => done(null, user))
      .catch(error => done(error ,false))
    });
    
}