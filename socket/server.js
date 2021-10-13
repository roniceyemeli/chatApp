const io = require('socket.io')(9000, {
    cors: {
        origin: "http://localhost:3001"
    }
});

let users = [];

const addUser = (userId, socketId) =>{
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId});
};

const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId !== socketId);
};
const  getUser = (userId) =>{
    return users.find(user => user.userId !== userId);
};

io.on("connection", (socket) => {
    console.log(" user connected...")


    // fetch userId and socketId from the client
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    });

    //send and get messages
    socket.on("sendMessage", ({senderId, receiverId, text}) =>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        })
    })


    //user disconnection
    socket.on("disconnect", ()=>{
        console.log("a user disconnect")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

