import Apperror from "../utils/Apperror.util.js"
// import {io} from "../index.js"
export const joinRoom = async (req, res,next  ) => {
    try {
        
        const emailToSocket = new Map() ;

        io.on("join-room"  ,(socket) => { 
            console.log("New Connection") ;

                socket.on("join-room" , (roomId , emailId) => {
                    console.log("user jpined " , emailId  , roomId);

                    emailToSocket.set(emailId , socket.id);
                    socket.join(roomId);
                    // Make the user of the room aware of the new user
                    socket.to(roomId).broadcast.emit("user-connected" , emailId);

                    socket.on("disconnect" , () => {
                        socket.to(roomId).broadcast.emit("user-disconnected "  + emailId , emailId)
                    })
                })
        })
    } catch (error) {
        return next(new Apperror(error.message , 400));

    }
} 