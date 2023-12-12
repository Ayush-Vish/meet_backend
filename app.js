import express from "express"; 
import dotenv from "dotenv";
import session from "express-session";

import cors from "cors";

import userRoute from "./routes/user.route.js";
import passport from "passport";
import morgan from "morgan";
import ApiResponse from "./utils/ApiResponse.util.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import connectToDb from "./config/db.config.js";
dotenv.config() ;   
const app = express();    
connectToDb() ; 



app.use(express.json()) ;
app.use(morgan("dev")) ;
app.use(session ({secret : process.env.SESSION_SECRET , resave : true , saveUninitialized : true   }  ))
app.use(passport.initialize()) ;
app.use(passport.session()) ;
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true 
}));





app.use("/api/v1/user/" , userRoute);

app.use(errorMiddleware); 


app.use("*" , (req ,res , next ) => {
    return new ApiResponse(res , 404 , "Not Found" , null )
})




export default app; 