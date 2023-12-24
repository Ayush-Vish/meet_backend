import app from "./app.js";

import {Server} from "socket.io";

const PORT =    process.env.PORT || 4000;

// const SOCKET_PORT = process.env.SOCKET_PORT;


const io = new Server(4002 , {

    cors : true
});


const emailToSocket = new Map() ;
const socketToEmail = new Map() ;

io.on("connection"  ,(socket) => { 
    console.log("Socket connected " , socket.id);
    socket.on("room:join" , ({emailId , roomId}) => {
        emailToSocket.set(emailId , socket.id) ;
        socketToEmail.set(socket.id , emailId) ;
        io.to(roomId).emit("user:joined" , {emailId , socketId: socket.id ,roomId })
        socket.join(roomId) ;
        console.log("Room joined " , emailId , roomId);
        io.to(socket.id).emit("room:join" , {emailId , roomId}) ;

    })
    
    socket.on("user:call" ,({to  , offer } ) => {
        io.to(to).emit("incomming:call" , {offer , from : socket.id}) ;
    })

    socket.on("call:accepted" ,( {to , answer}) => {
        io.to(to).emit("call:accepted" , {answer , from : socket.id}) ;

    })
    
    socket.on("peer:nego:needed" , ({to , offer}) => {
        io.to(to).emit("peer:nego:needed" , {offer , from : socket.id}) ;
    })

    socket.on("peer:nego:done" , ({to , ans } ) => {
        io.to(to).emit("peer:nego:final" , {ans , from : socket.id}) ;
    })

   
})


app.listen(PORT, () => {        
    console.log(`Server is listening on port ${PORT}`); 
}); 

