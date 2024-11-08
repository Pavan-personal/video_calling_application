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
io.on("connection", function (socket) {
    console.log("socket connected", socket.id);
});
