import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";

const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User left room ${room}`);
  });
  socket.on("newMessage", ({ currentRoom, inputmsg }) => {
    io.to(currentRoom).emit("messageBroadcast", inputmsg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
});
