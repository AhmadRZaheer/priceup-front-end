import { backendURL } from "@/utilities/common";
import { io } from "socket.io-client";

export const socketClient = io(backendURL, {
  transports: ["websocket", "polling", "flashsocket"],
});
