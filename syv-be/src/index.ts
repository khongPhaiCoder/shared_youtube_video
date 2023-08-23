import chalk from "chalk";
import { Server, Socket } from "socket.io";
import app from "./app";
import { CLIENT_URL } from "./config";

const server = app.listen(app.get("port"), () => {
  console.log(
    chalk.greenBright(
      `Listening on port ${app.get("port")} in ${app.get("env")} mode`
    )
  );
});

export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log("New client connected");
});

export default server;
