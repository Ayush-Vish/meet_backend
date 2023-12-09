import express from "express"; 
import dotenv from "dotenv";
import session from "express-session";


import userRoute from "./routes/user.route.js";
import passport from "passport";

dotenv.config() ;   
const app = express();  

app.use(session ({secret : process.env.SESSION_SECRET , resave : false , saveUninitialized : true , cookie : {secure: true} }  ))
app.use(passport.initialize()) ;
app.use(passport.session()) ;



dotenv.config() ;

app.use(express.json()) ;
app.use(express.urlencoded({extended: true})) ;


app.use("/api/v1/user/" , userRoute);




export default app; 