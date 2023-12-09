import express from "express" ;



const router = express.Router( );


import "../controllers/google.auth.js";

import {isLoggedIn} from  "../middlewares/auth.middleware.js";


 
import passport from "passport";

router.route("/")
    .get((req, res )=> {
        res.send(`<a href="auth/google/" > dkjbfd </a>`);

    });
router.route("/auth/google/")
    .get((req, res, next) => {
        console.log("ddaslfslkfnlskdfn")
        console.log("fkjsndkfnsdlsdjvfksdbfksjdbfksdbfjsdvbfjsdvfjsd")
        passport.authenticate("google", {scope: ["profile", "email" ,""]})(req, res, next); 
    });
router.route("/auth/google/callback/")
    .get((req, res, next) => {
        console.log("callback");

        passport.authenticate("google", {
            successRedirect: "http://localhost:4000/api/v1/user/auth/google/success",
            failureRedirect: "http://localhost:4000/api/v1/user/auth/google/failure"
        })(req, res, next);
    });


router.route("/auth/google/success")
    .get((req ,res ) => {
        res.send("You are authenticated and success ");
    })  

router.route("/auth/google/failure" , (req ,res ) => {
    res.send("You are not authenticated");  
});


router.route("/protected")
    .get(isLoggedIn , (req ,res ) => { 
            res.status(200).json({
                user : req.user

            })
    })
router.route("/logout")
    .get((req, res) => { 
        // req.logout();
        if (req.session) {
            req.session.destroy((err) => {
                if(err)  {
                    console.log(err);
                }   
                req.user = null;    
                res.send("You are logged out");  
            });  
        } else {
            res.send("You are logged out");  
        }
    });

export default router;
