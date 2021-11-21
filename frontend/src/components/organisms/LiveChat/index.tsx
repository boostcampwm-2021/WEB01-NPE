import React, { FunctionComponent, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import * as Socket from "socket.io-client";
import Image from "next/image";

import * as Styled from "./styled";

interface UserType {
  userId: number;
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

interface ChatType {
  id: string;
  message: string;
  date: string;
}

// let users: { [socketId: string]: UserType } = {};

const LiveChat: FunctionComponent<{ socket: Socket.Socket }> = ({ socket }) => {
  const [session, loading] = useSession();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [users, setUsers] = useState<{ [socketId: string]: UserType }>({});
  const [userCount, setUserCount] = useState<number>(0);
  useEffect(() => {
    socket.on("chat", (chatItem: ChatType) => {
      setChats((chatList: ChatType[]) => [...chatList, chatItem]);
    });
    socket.on("user join", ([socketId, user]) => {
      const newUser = {};
      newUser[socketId] = user;
      setUsers((prevUsers) => {
        return {
          ...prevUsers,
          ...newUser,
        };
      });
      setUserCount((prevCount) => prevCount + 1);
      const newChat: ChatType = {
        id: "alert",
        message: `${user.user.name} 님이 참여하셨습니다!`,
        date: "",
      };
      setChats((chatList: ChatType[]) => [...chatList, newChat]);
    });
    socket.on("user exit", ([socketId, name]) => {
      const newChat = {
        id: "alert",
        message: `${name} 님이 퇴장하셨습니다!`,
        date: "",
      };
      setChats((chatList: ChatType[]) => [...chatList, newChat]);
      setUserCount((prevCount) => prevCount - 1);
    });
    socket.on("init users", ([initUsers, count]) => {
      setUsers((prevUsers) => {
        return {
          ...prevUsers,
          ...initUsers,
        };
      });
      setUserCount(count);
    });
  }, []);
  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const input = event!.target!.value;
      event!.target!.value = "";
      if (input.length === 0) {
        return;
      }
      const chat = {
        id: socket.id,
        message: input,
        date: new Date(),
      };
      socket.emit("chat", chat);
    }
  };
  const convertToString = (dateStr: string) => {
    const date: Date = new Date(dateStr);
    const pmOrAm = date.getHours() > 12 ? "PM" : "AM";
    return `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}. ${pmOrAm} ${
      date.getHours() % 12
    }:${date.getMinutes()}`;
  };
  const showChat = (chat: ChatType, index: number) => {
    if (chat.id === "alert") {
      return (
        <Styled.Message key={index}>
          <Styled.Signal>{chat.message}</Styled.Signal>
        </Styled.Message>
      );
    }
    if (chat.id == socket.id) {
      return (
        <Styled.Message key={index}>
          <Styled.UserInformation>
            <Styled.ChatDate isMine={true}>
              {convertToString(chat.date)}
            </Styled.ChatDate>
          </Styled.UserInformation>
          <Styled.ChatMyContent isMine={true}>
            {chat.message}
          </Styled.ChatMyContent>
        </Styled.Message>
      );
    }
    return (
      <Styled.Message key={index}>
        <Styled.UserInformation>
          <Styled.UserImg>
            <Image width={30} height={30} src={users[chat.id].user.image} />
          </Styled.UserImg>
          <Styled.UserDetail>
            <Styled.UserName>{users[chat.id].user.name}</Styled.UserName>
            <Styled.ChatDate>{convertToString(chat.date)}</Styled.ChatDate>
          </Styled.UserDetail>
        </Styled.UserInformation>
        <Styled.ChatContent>{chat.message}</Styled.ChatContent>
      </Styled.Message>
    );
  };
  return (
    <Styled.ChatContainer>
      <Styled.ChatHeader>
        채팅
        <Styled.UserCount>{userCount}</Styled.UserCount>
      </Styled.ChatHeader>
      <Styled.Messages>{chats.map(showChat)}</Styled.Messages>
      <Styled.InputContainer>
        <Styled.Input
          name="chat"
          placeholder="메세지를 입력해주세요."
          onKeyPress={onKeyPress}
        />
      </Styled.InputContainer>
    </Styled.ChatContainer>
  );
};

export default LiveChat;
