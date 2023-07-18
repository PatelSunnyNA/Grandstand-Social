import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import StandardMessageForm from "./StandardMessageForm";
import CustomerHeader from "./CustomHeader";


const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    "89fed1b1-05df-406a-bcde-689cdcd061bf",
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <CustomerHeader chat={chat} />}
        renderMessageForm={(props) => {
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;

