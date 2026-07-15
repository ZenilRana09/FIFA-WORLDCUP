import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`
🚀 FIFA SmartStadium API Started

Environment : ${env.NODE_ENV}
Port        : ${env.PORT}

Server URL  : http://localhost:${env.PORT}
Health API  : http://localhost:${env.PORT}/api/health
`);
});