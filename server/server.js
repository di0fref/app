import express from "express";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import CardRoute from "./routes/CardRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ProjectRoute from "./routes/ProjectRoute.js";
import "./models/Associations.js"
import authenticateJWT from "./auth/token.js";
import {accessTokenSecret} from "./controllers/UserController.js";
import {authorize} from '@thream/socketio-jwt'

export const app = express();
const server = http.createServer(app);
export const io = new Server(server, {cors: {origin: "*"}});

io.on('connection', function (socket) {
    console.log('Client connected to the WebSocket');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('update', function (msg) {
        console.log("Received a chat message");
        io.emit('update', msg);
    });
})


io.use(
    authorize({
        secret: accessTokenSecret
    })
)


app.use(cors());
app.use(express.json());
app.use(authenticateJWT)
app.use([UserRoute, CardRoute, ProjectRoute]);

// app.listen(8000, () => console.log('Server up and running...'));
app.get('/', (req, res) => {
    res.send("Server is up and running")
})

server.listen(8000, () => {
    console.log(`Listening to 8000`);
})
