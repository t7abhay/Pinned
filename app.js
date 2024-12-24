import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

/* 
- we open a socket on port 
- we are listening for an  event (in this case a message from client i.e browser)
- if we receiver a message , we  emit it through io.emit , with event name and the message itself

*/
io.on("connection", (socket) => {
    // from the front end ( browser)
    socket.on("chat message", (message) => {
        console.log("message: " + message);
        io.emit("chat message", message);
    });
});

server.listen(process.env.PORT || 8000, () => {
    console.log(`🥭Server is listening on: ${process.env.PORT}`);
});
