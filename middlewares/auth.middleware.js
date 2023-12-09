const  isLoggedIn =  (req, res, next) =>   {
    if(req.user)  {
        next( );
        
    }
    else  { 
        res.status(401).send("You are not authenticated");
    }
}

export {isLoggedIn} ;