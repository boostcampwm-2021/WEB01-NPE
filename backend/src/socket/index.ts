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

const users: UsersType = {};
const codes: CodeType = { tabList: [], index: "0" };
let streamUserList: string[] = [];
export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    if (!user) return;
    next();
  });

  io.on("connection", (socket) => {
    console.log(socket.id + " is connected");
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

      socket.emit("stream:initUsers", Object.values(users[roomName]));
      socket.to(roomName).emit("stream:userJoin", Object.values(user)[0]);
    });
    socket.on("disconnect", (reason) => {
      console.log(reason);
      // delete users[roomName][socket!.id];
    });

    socket.on("chat", (chatItem) => {
      io.to(roomName).emit("chat", chatItem);
    });

    socket.on("code", (code) => {
      if (code.tabList !== undefined) {
        codes.tabList = [...code.tabList];
        codes.index = code.index;
      }
      io.to(roomName).emit("code", codes);
    });

    socket.on("disconnect", () => {
      streamUserList = streamUserList.filter((user: any) => user !== socket.id);
      io.emit("stream:user_exit", { id: socket.id });
    });

    socket.on("stream:offer", (data) => {
      socket.to(data.offerReceiveID).emit("stream:getOffer", {
        sdp: data.sdp,
        offerSendID: data.offerSendID,
      });
    });
    socket.on("stream:answer", (data) => {
      socket.to(data.answerReceiveID).emit("stream:getAnswer", {
        sdp: data.sdp,
        answerSendID: data.answerSendID,
      });
    });
    socket.on("stream:candidate", (data) => {
      socket.to(data.candidateReceiveID).emit("stream:getCandidate", {
        candidate: data.candidate,
        candidateSendID: data.candidateSendID,
      });
    });

    socket.on("stream:join", () => {
      streamUserList.push(socket.id);
      io.sockets.to(socket.id).emit("stream:all_users", streamUserList);
    });
  });
};
