/**
 * Message UI
 */

 import React, { useEffect, useState } from "react";
 import {
     BrowserRouter as Router,
     Switch,
     Route,
     Link,
     useNavigate
 } from "react-router-dom";
 import '../../styling/Messenger.scss';

 const Message = (props) => { 

    const [username, setUsername] = useState("");
    const [body, setBody] = useState("");

    /**
     * var to see if the message is from the user, if it is then another css gets applied to it
     */
    //const fromMe = this.props.fromMe ? 'from-me' : '';
    const fromMe = props.fromMe ? 'from-me' : '';

    const onLoad = async() => {
    }

    return (
        <div className={`message ${fromMe}`}>
            <div className='username'>
                { username }
            </div>
            <div className='message-body'>
                { /*body*/ props.body }
            </div>  
        </div>
    );
}

export default Message;