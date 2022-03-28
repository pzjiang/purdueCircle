import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { useUserState } from "../../contexts/user";
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from "../../contexts/auth";
import { resetAuthTokens } from "../../apis/axios";
import { useToasts } from 'react-toast-notifications';
import messagesApi from "../../apis/apimessages";

const ChatInput = (props) => {

    const [inputValues, setInputValues] = useState({
        message: '',
    });

    const newChat = async(event) => {
        console.log("new chat");
        event.preventDefault();
        try {
            await messagesApi.sendMessage({ message: { body: inputValues.body } });
            navigate("/");
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

    }

    return (
        <form className="chat-input" onSubmit={newChat}>
        <input type="text"
          value={inputValues.body}
          onChange={(e) => setInputValues({ ...inputValues, body: e.target.value })}
          placeholder="Write a message..."
          required />
      </form>
    );
}

export default ChatInput;