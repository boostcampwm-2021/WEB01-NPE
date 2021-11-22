import React, { useState, useEffect } from "react";
// import { Container } from "./style";

import { ProfileSummary } from "@src/components/molecules";
import { AuthorType } from "@src/types";
import MuteButton from "./MuteButton";

export default function AudioList({ socket }) {
  const [profileUserList, setProfileUserList] = useState([]);
  const [myMute, setMyMute] = useState(false);
  useEffect(() => {
    socket.on("user join", ([socketId, user]) => {
      setProfileUserList([...profileUserList, Object.values(user)]);
    });
    socket.on("init users", (initUsers) => {
      setProfileUserList(Object.values(initUsers));
    });
  }, []);

  return (
    <div>
      {profileUserList.map((user) => {
        const author: AuthorType = {
          id: user.userid,
          profileUrl: user.user.image,
          username: user.user.name,
          score: 0,
        };
        return <ProfileSummary author={author} />;
      })}
      <MuteButton setMyMute={setMyMute} myMute={myMute} />
    </div>
  );
}
