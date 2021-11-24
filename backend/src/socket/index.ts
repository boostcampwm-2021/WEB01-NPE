import * as socketio from "socket.io";
import { verify } from "jsonwebtoken";

interface SessionUser {
  userId: number;
  user: {
    name: string;
    image: string;
  };
  expires: string;
}
interface UsersType {
  [roomName: string]: {
    [socketId: string]: SessionUser;
  };
}
interface CodeType {
  tabList: string[];
  index: string;
}

interface sendPayload {
  signal: any;
  callerId: any;
  userToSiganl: any;
}
interface returnPayload {
  callerId: any;
  signal: any;
}

const users: UsersType = {};
const codes: CodeType = { tabList: [], index: "0" };
let streamUserList: any = {};
const socketToRoom: any = {};

export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    if (!user) return;
    next();
  });

  io.on("connection", (socket) => {
    let roomName = "";
    socket.on("joinRoom", ({ questionId }: { questionId: string }) => {
      roomName = questionId;
      socket.join(roomName);

      const token = socket.handshake.auth.token;
      const user = verify(token, "keyboard cat") as SessionUser;
      if (users[roomName] === undefined) {
        users[roomName] = {};
      }
      users[roomName][socket.id] = user;

      socket.emit("init users", users[roomName]);
      socket.to(roomName).emit("user join", [socket.id, user]);

      socket.on("code", (code) => {
        if (code.tabList !== undefined) {
          codes.tabList = [...code.tabList];
          codes.index = code.index;
        }
        io.to(roomName).emit("code", codes);
      });
    });

    socket.on("stream:join", ({ questionId }: { questionId: string }) => {
      if (streamUserList[questionId]) {
        streamUserList[questionId].push(socket.id);
      } else {
        streamUserList[questionId] = [socket.id];
      }
      const otherUser = streamUserList[questionId].filter(
        (id: string) => id !== socket.id
      );
      socketToRoom[socket.id] = questionId;
      socket.emit("stream:allUsers", otherUser);
    });

    socket.on("disconnect", (reason) => {
      // const userName = users[roomName][socket!.id].user.name;
      // io.to(roomName).emit("user exit", [socket!.id, userName]);
      // delete users[roomName][socket!.id];
      // io.to(roomName).emit("user count", Object.keys(users[roomName]).length);
      // console.log(socket.id + " is disconnected. reason : " + reason);

      const roomID = socketToRoom[socket.id];
      io.emit("stream:exit", socket.id);
      let room = streamUserList[roomID];
      if (room) {
        room = room.filter((id: string) => id !== socket.id);
        streamUserList[roomID] = room;
      }
    });

    socket.on("chat", (chatItem) => {
      io.to(roomName).emit("chat", chatItem);
    });

    socket.on("stream:sendingSignal", (payload: sendPayload) => {
      io.to(payload.userToSiganl).emit("stream:userJoin", {
        signal: payload.signal,
        callerId: payload.callerId,
      });
    });

    socket.on("stream:returningSignal", (payload: returnPayload) => {
      io.to(payload.callerId).emit("stream:recevingReturnSignal", {
        signal: payload.signal,
        id: socket.id,
      });
    });
  });
};
