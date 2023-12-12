import {Strategy} from "passport-google-oauth2"
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/users.model.js";
dotenv.config() ; 

const GoogleStrategy = Strategy;




passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAIN}/api/v1/user/auth/google/callback`,

  },
  async function(request, accessToken, refreshToken, profile, done) {
    const ifuserExists= await User.findOne({email : profile.email}) ;
    if(ifuserExists) {
      return done(null, profile);
    }
    else {

      const user=  await User.create ({
        name : profile.displayName , 
        email : profile.email , 
        picture : profile.picture, 
        sub : profile.sub, 
        domain : profile.domain ,
      })
      await user.save() ;
    }
    return done(null, profile);
  }

));


passport.serializeUser(function ( user,done)  {

  done(null ,user) ;

})

passport.deserializeUser(function ( user,done)  {

  done(null   ,user) ;
  
})