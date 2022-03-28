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
     useNavigate,
     useParams
 } from "react-router-dom";
import { useUserState } from "../../contexts/user";
import Message from "./Message";
import ChatInput from "./ChatInput";
import messagesApi from "../../apis/apimessages";
import '../../styling/Messenger.scss';

 const DM = (props) => { 

    const [messages, setMessages] = useState();
    const { user } = useUserState();
    const msgFromMe = false;

    useEffect(() => {

        if (isNaN(index) == true) {
            navigate("/notfound");
            return;
        }
        let thisId = parseInt(index, 10);
        setId(parseInt(index, 10));

        onLoad(thisId);

    }, []);

    const onLoad = async () => {
        try {
            const { data } = await messagesApi.getMessages({ convo_id: thisId });
            setMessages(data.response);

            console.log(data);
            
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

    const backToConvos = async() => {
        Navigate(`/messenger/`)
    }

    return (
        <Layout>
        <div className="dm">
            <button onClick={backToConvos()}>back</button>
            <div className="userProfile">
                other user's info that you're talking to will go header<br></br>
                insert link to profile as well
            </div>
            <div className="messages" id="messageList">
                {messages.map((message) => (
                        <Message fromMe={ message.origin_id == user.id } 
                            body={message.body} 
                            id={message.id} key={message.id} />
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
        </Layout>
    );
}

export default DM;