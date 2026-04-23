import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

const io = new Server(server);

const checkboxes = new Array(10000).fill(false);
let users = 0;

app.use(express.static(path.join(__dirname, "public")));


app.get("/ping" , (req,res) => res.send("pong"))

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname , 'public', "index.html"))
})

io.on("connection", (socket) => {
    console.log("socket has connected" , socket.id);
    users++;
    socket.emit("io:conn", checkboxes, users);

socket.on("socket:checked", (id) => {
    checkboxes[id] = true;
    io.emit("socket:checked", id);
})

socket.on("socket:unchecked", (id) => {
    checkboxes[id] = false;
    io.emit("socket:unchecked", id);
})

socket.on("disconnect" , () => {
    users--;
    io.emit("io:diss", users);
    console.log("socket disconnected" , socket.id);
})

})

server.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})