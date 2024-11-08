import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const PORT = parseInt(process.env.SOCKET_PORT || "3000", 10);

const io = new Server(PORT, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("socket connected", socket.id);
});
