import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export const socket = URL ? io(URL, { transports: ["websocket"] }) : io();
