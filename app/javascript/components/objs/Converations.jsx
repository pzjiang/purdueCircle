import React from "react";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";

const Conversations = props => {

  const filters = { type: "messaging", members: { $in: [props.userId] } };
  const sort = { last_message_at: -1 };
  
  return (
    <Chat client={props.chatClient} theme={"messaging dark"}>
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default Conversations;