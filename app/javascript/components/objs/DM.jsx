/**
 * DM UI
 * Conversation between two users
 */

 import React, { useEffect, useState } from "react";
 import {
     BrowserRouter as Router,
     Switch,
     Route,
     Link,
     useNavigate
 } from "react-router-dom";

import Message from "./Message";
import ChatInput from "./ChatInput";
import '../../styling/Messenger.scss';

 const DM = () => { 

    const [messages, setMessages] = useState([{ text: "text", id: 1 }]);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        try {
            const { data } = await messagesApi.getMessage();
            //setPosts(data.response);

            console.log(data);
            setMessages(data.messages);
            
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    };

    const sendHandler = async() => {

    }

    return (
        <div className="dm">
            <div className="userProfile">
                other user's info that you're talking to will go header<br></br>
                insert link to profile as well
            </div>
            <div className="messages" id="messageList">
                {messages.reverse().map((message) => (
                        <Message body={message.body} id={message.id} key={message.id} />
                    ))}
                    <Message fromMe={true} body="fake message one to test how a long message might appear on the ui. it do be important that the text box flexes if there's a big paragraph that is written from one user to another."/>
                    <Message fromMe={true} body="hello"/>
                    <Message fromMe={false} body="hi there"/>
                    <Message fromMe={true} body="how are you doing today"/>
            </div>
            <div className="chat">
                <ChatInput />
            </div>
        </div>
    );
}

export default DM;