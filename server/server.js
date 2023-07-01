const express = require('express');
const connectDB = require('./config/connectDB');
const errorResponse = require('./middleware/errorHandler')
const users = require('./routes/users');
const document = require('./routes/document');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })
connectDB();



/* socket io stuff */
const { Server } = require('socket.io');
const server = require('http').createServer(app);

const io = new Server(server, {
    cors: {
        // ! this is the origin from where requests will be made to our socket io server from client.
        origin: "*",
        methods: ["GET", "POST"]
    }
});


let onlineUsers = [];

io.on('connection', (socket) => {

    console.log('user connected with socket.id : ', socket.id);

    socket.on("add-user", (email) => {
        console.log({email});
        onlineUsers = onlineUsers.filter(user => user !== email)
        onlineUsers.push(email)
        console.log(onlineUsers, "onlineUsers");
        io.emit("get-online-users", onlineUsers)
    });

    socket.on('remove-user', (email) => {
        onlineUsers = onlineUsers.filter(user => user !== email)
        io.emit("get-online-users", onlineUsers)
    })
});

/* socket io stuff ends here */

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/users', users);
app.use('/api/v1/document', document);
app.use(errorResponse);


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

