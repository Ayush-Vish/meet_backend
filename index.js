import app from "./app.js";

import {Server} from "socket.io";

const PORT =    process.env.PORT || 4000;

const io = new Server({
    cors : true
});


const emailToSocket = new Map() ;

io.on("connection"  ,(socket) => { 
        socket.on("join-room" , ({roomId , emailId}) => {
            console.log("user joined " , emailId  , roomId);

            emailToSocket.set(emailId , socket.id);
            socket.join(roomId);
            
            socket.emit("joined-room" , {roomId})
            // Make the user of the room aware of the new user

            socket.broadcast.to(roomId).emit("user-joined" , emailId);

            socket.on("disconnect" , () => {
                socket.broadcast.to(roomId).emit("user-disconnected "  + emailId , emailId)
            })
        })
})


app.listen(PORT, () => {        
    console.log(`Server is listening on port ${PORT}`); 
}); 

io.listen(4001);
