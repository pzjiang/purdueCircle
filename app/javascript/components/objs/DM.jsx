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
import Layout from "./Layout";

 const DM = (props) => { 

    const [messages, setMessages] = useState([]);
    const { user } = useUserState();
    const [id, setId] = useState(0);
    const { index } = useParams();
    const navigate = useNavigate();
    const msgFromMe = false;
    const [newMessage, setNewMessage] = useState("");

    const [secUser, setSecUser] = useState("");

    useEffect(() => {

        if (isNaN(index) == true) {
            navigate("/notfound");
            return;
        }
        let thisId = parseInt(index, 10);
        setId(parseInt(index, 10));

        onLoad(thisId);

    }, []);

    const onLoad = async (thisId) => {
        console.log(thisId);
        try {
            console.log("fetching messages");
            const { data } = await messagesApi.getMessages({ convo_id: thisId });
            console.log(data.messages);
            setMessages(data.messages);
            console.log("retrieved messages from convo");
            console.log(messages);

            console.log("set second user info");

            
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

    function backToConvos() {
        navigate(`/messenger/`);
    }

    const newChat = async(event) => {
        console.log("new chat");
        console.log(newMessage);

        event.preventDefault();
        try {
            const {data} = await messagesApi.sendMessage( { origin_id: user.id, target_id: 2, body: newMessage.body, convo_id: id } );
            //navigate("/");
            const newList = [...messages, data.newMessage];
            setMessages(newList);
            console.log("success probably");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
        
        setNewMessage("");

    }

    return (
        <Layout>
        <div className="dm">
            <button onClick={()=> backToConvos()}>back</button>
            <div className="userProfile">
                other user's info that you're talking to will go header<br></br>
                insert link to profile as well
            </div>
            <div className="messages">
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
                <form className="chat-input" onSubmit={newChat}>
                <input type="text"
                value={newMessage.body}
                onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                placeholder="Write a message..."
                required />
            </form>
            </div>
        </div>
        </Layout>
    );
}

export default DM;