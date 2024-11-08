"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var dotenv = require("dotenv");
dotenv.config({
    path: "../.env",
});
var PORT = parseInt(process.env.SOCKET_PORT || "3000", 10);
var io = new socket_io_1.Server(PORT, {
    cors: {
        origin: "*",
    },
});
// const EmailToSocket = new Map<String, Socket>();
var EmailToSocketId = new Map();
var SocketIdToEmail = new Map();
io.on("connection", function (socket) {
    console.log("socket connected", socket.id);
    socket.on("room:join", function (data) {
        console.log("The data from the client: ", data);
        EmailToSocketId.set(data === null || data === void 0 ? void 0 : data.email, socket.id);
        SocketIdToEmail.set(socket === null || socket === void 0 ? void 0 : socket.id, data === null || data === void 0 ? void 0 : data.email);
        io.to(socket === null || socket === void 0 ? void 0 : socket.id).emit("room:join", {
            message: "You have joined the room",
            data: data,
        });
    });
});
