import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { env } from "./common/config/env.js";
import { setIO } from "./lib/socket.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

setIO(io);

io.on("connection", (socket) => {
  console.log(`✅ Client Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});

httpServer.listen(env.PORT, () => {
  console.log(`
🚀 FIFA SmartStadium API Started

Environment : ${env.NODE_ENV}
Port        : ${env.PORT}

Server URL  : http://localhost:${env.PORT}
Health API  : http://localhost:${env.PORT}/api/health

⚡ Socket.IO Enabled
`);
});