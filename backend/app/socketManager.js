const io = require("./../server").io;

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

module.exports = (socket) => {



    try {
        console.log("Connected");
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });

        //take userId and socketId from user
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });
        //send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            });
        });
        //when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
        socket.on("code", (data, callback) => {
            socket.broadcast.emit("code", data);
        });
    } catch (ex) {
        console.log(ex.message);

    }
};