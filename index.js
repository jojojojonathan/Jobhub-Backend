const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const bookmarkRouter = require("./routes/bookmark");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => console.log(err));

app.use(express.json());
app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

app.get('/', (req, res) => res.send('Hello Keygen!'))

const server = app.listen(process.env.PORT || 5001, () => console.log(`Example app listening on port ${process.env.PORT}!`));
// app.listen(process.env.PORT_SECURE || 5002, () => console.log(`Example app listening on port ${process.env.PORT_SECURE}!`))

const io = require('socket.io') (server, {
    pingTimeout: 60000,
    cors: {
        // localhost
        // origin: "http:localhost:5001"

        // hosted server
        origin: "https://jobhub-backend-production.up.railway.app/"
    }
});

io.on("connection", (socket) => {
    console.log("connected to sockets");

    socket.on('setup', (userId) => {
        socket.join(userId);
        socket.broadcast.emit('online-user', userId)
        console.log(userId);
    });

    socket.on('typing', (room) => {
        console.log("typing");
        console.log("room");

        socket.to(room).emit('typing', room)
    });

    socket.on('stop typing', (room) => {
        console.log("stop typing");
        console.log("room");

        socket.to(room).emit('stop typing', room)
    });

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("User Joined : " + room);
    });

    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        var room = chat._id;

        var sender = newMessageReceived.sender;
        console.log(sender, "senderId")
        if (!sender || sender._id) {
            console.log("Sender not defined");
            return;
        }
        
        var senderId = sender._id;
        console.log(senderId + "message sender");
        const users = chat.users;

        if (!users) {
            console.log("Users not defined");
            return;
        }

        socket.to(room).emit('message received', newMessageReceived);
        socket.to(room).emit('message sent', "New Message");
    });

    socket.off('setup', () => {
        console.log('user offline');
        socket.leave(userId);
    });
})