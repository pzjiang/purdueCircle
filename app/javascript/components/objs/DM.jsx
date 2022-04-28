/**
 * DM UI
 * Conversation between two users
 */

import React, { useEffect, useState, useRef } from "react";
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
import messagesApi from "../../apis/apimessages";
import '../../styling/Messenger.scss';
import Layout from "./Layout";
import usersApi from "../../apis/apiusers";

const DM = (props) => {

    const [messages, setMessages] = useState([]);
    const { user } = useUserState();
    const [id, setId] = useState(0);
    const { index } = useParams();
    const navigate = useNavigate();
    const msgFromMe = false;
    //const [secId, setSecId] = useState(0);
    const [newMessage, setNewMessage] = useState("");

    const [secUser, setSecUser] = useState("");

    useEffect(() => {

        if (isNaN(index) == true) {
            navigate("/notfound");
            return;
        }
        let thisId = parseInt(index, 10);
        setId(parseInt(index, 10));
        //setSecId(props.secId);

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

            setSecUser(data.second_name);

            /*const secID = data.sec_user_id;
            const { newUser } = await usersApi.getUser({ user_id: secID});

            console.log("got user");
            console.log(newUser);
            setSecUser(newUser);*/

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

    function backToConvos() {
        navigate(`/messenger/`);
    }

    /*
     * deleteConvo
     * Delete conversation with user
    **/
    const deleteConvo = async () => {
        try {
            await messagesApi.deleteConvo({ id: id })
            backToConvos();
            //console.log("deleted");
            addToast("DM successfully deleted!", { appearance: 'success', autoDismiss: true, });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }

    }

    const newChat = async (event) => {
        console.log("new chat");
        console.log(newMessage);

        event.preventDefault();
        try {
            const { data } = await messagesApi.sendMessage({ origin_id: user.id, target_id: 23, body: newMessage.body, convo_id: id });
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

        setNewMessage({ ...newMessage, body: '' });

    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <Layout>
            <div className="dm">
                <div className="options">
                    <div>
                    <button className="backToConvos" onClick={() => backToConvos()}>back</button>
                    </div>
                    <div className="userProfile">
                        DM with {secUser}: @<Link to='' >{/*secUser.username*/}</Link>
                    </div>
                    <div>
                    <button className="delete" onClick={deleteConvo}>delete conversation</button>
                    </div>
                </div>
                <div id="messages" >
                    {messages.map((message) => (
                        <Message fromMe={message.origin_id == user.id}
                            body={message.body}
                            id={message.id} key={message.id} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat">
                    <form className="chat-input" onSubmit={newChat}>
                        <input id="sendMessage"
                            type="text"
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