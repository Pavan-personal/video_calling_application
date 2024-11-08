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

const EmailToSocketId = new Map<string, string>();
const SocketIdToEmail = new Map<string, string>();

io.on("connection", (socket: Socket) => {
  console.log("socket connected:", socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;

    console.log("The data from the client: ", data);

    EmailToSocketId.set(data?.email, socket.id);
    SocketIdToEmail.set(socket?.id, data?.email);

    socket.join(room);
    socket.to(room)?.emit("user:joined", { email, room });

    io.to(socket?.id).emit("room:join", {
      message: "You have joined the room",
      data: data,
    });

    const usersInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []).map(
      (socketId) => SocketIdToEmail.get(socketId)
    );

    io.to(room).emit("room:users", {
      otherUsers: usersInRoom,
    });
  });
});
