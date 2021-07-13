require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const Routes = require("./app/routes");
const userRoute = require("./app/routes/users");
const authRoute = require("./app/routes/auth");
const conversationRoute = require("./app/routes/conversations");
const messageRoute = require("./app/routes/messages");
const helmet = require("helmet");
const morgan = require("morgan")
    //App config

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan());

app.use([
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    Routes,
]);

//api routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

const io = (module.exports.io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
}));
const socketManager = require("./app/socketManager");


io.on("connection", socketManager);

//MongoDB Config


mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("MongoDB is connected");
});

//Listening to the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});