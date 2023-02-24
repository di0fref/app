import express from "express";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import CardRoute from "./routes/CardRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ProjectRoute from "./routes/ProjectRoute.js";
import LabelRoute from "./routes/LabelRoute.js"
import "./models/Associations.js"
import authenticateJWT from "./auth/token.js";
import {accessTokenSecret} from "./controllers/UserController.js";
import {authorize} from '@thream/socketio-jwt'
import {addUser, getAllUsers, deleteUser, getUser} from "./users.js";
import ChecklistRoute from "./routes/ChecklistRoute.js";

export const app = express();
const server = http.createServer(app);
export const io = new Server(server, {cors: {origin: "*"}});

io.on('connection', function (socket) {
    console.log('Client connected to the WebSocket');

    socket.on('init', ({userId, userName}) => {
        addUser(socket.id, userName)
    });

    socket.on('disconnect', () => {
        const user = deleteUser(socket.id)

    });

    socket.on("join", function ({room, name}) {
        socket.join(room)
        console.log(name + " joined room", room)
    })


    socket.on("card reorder", function ({room, board}) {
        const user = getUser(socket.id)
        socket.broadcast.in(room).emit('card reorder', {
            board: board,
        });
    })

    socket.on("card update", function ({room, id}) {
        const user = getUser(socket.id)
        socket.broadcast.in(room).emit('card update', {
            id: id,
        });
    })

    socket.on("card new", function ({room, id}) {
        console.log(room, id);
        const user = getUser(socket.id)
        socket.broadcast.in(room).emit('card new', {
            id: id,
        });
    })

})


io.use(
    authorize({
        secret: accessTokenSecret
    })
)


app.use(cors());
app.use(express.json());
app.use(authenticateJWT)
app.use([UserRoute, CardRoute, ProjectRoute, LabelRoute, ChecklistRoute]);

// app.listen(8000, () => console.log('Server up and running...'));
app.get('/', (req, res) => {
    res.send("Server is up and running")
})

server.listen(8000, () => {
    console.log(`Listening to 8000`);
})
