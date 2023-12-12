import {Strategy} from "passport-google-oauth2"
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/users.model.js";
import Apperror from "../utils/Apperror.util.js";
dotenv.config() ; 

const GoogleStrategy = Strategy;




passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAIN}/api/v1/user/auth/google/callback`,

  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      
      const ifuserExists= await User.findOne({googleId : profile.id}) ;
      if(ifuserExists) {
         done(null, ifuserExists);
      }
      else {
  
        const user=  await User.create ({
          name : profile.displayName , 
          email : profile.email , 
          picture : profile.picture, 
          sub : profile.sub, 
          domain : profile.domain , 
          googleId : profile.id
        })
        await user.save() ;
        done(null, user);
      }
    } catch (error) {
      return next( new Apperror ("Error in making a new USer" , 400) )
    }
  }

));


passport.serializeUser(function ( user,done)  {

  done(null ,user._id) ;

})

passport.deserializeUser( async function ( id,done)  {
  const user  =await User.findById(id ) ;
  if(user)  {
    return done(null , user) ;
    
  }
  
})