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

    return (
        <div className="dm">
            <div className="userProfile">
                other user's info that you're talking to will go header<br></br>
                insert link to profile as well
            </div>
            <div className="messages">
                {messages.reverse().map((message) => (
                        <Message text={message.text} id={message.id} key={message.id} />
                    ))}
                    <Message text="fake message one to test"/>
                    <Message text="hello"/>
                    <Message text="hi there"/>
                    <Message text="how are you doing today"/>
            </div>
            <div className="sendMessages">
                <input>send message to other user</input>
            </div>
        </div>
    );
}

export default DM;