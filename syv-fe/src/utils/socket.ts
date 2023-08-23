import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initiateSocket = (): void => {
  socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
    withCredentials: true,
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const getSocket = () => {
  return socket;
};
