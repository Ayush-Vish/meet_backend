import {Strategy} from "passport-google-oauth2"
import passport from "passport";
import dotenv from "dotenv";
dotenv.config() ; 

const GoogleStrategy = Strategy;


console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/v1/user/auth/google/callback",
    passReqToCallback   : false
  },
  function(request, accessToken, refreshToken, profile, done) {
    
    console.log(profile);

    return done(null, profile);
  }

));


passport.serializeUser(function ( user,done)  {
  console.log("Serializaion Done ");
  done(null ,user) ;

})

passport.deserializeUser(function ( user,done)  {
  console.log("deserializeUser Done");
  done(null   ,user) ;
  
})