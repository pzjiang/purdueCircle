/**
 * Notification UI
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

 const Notification = (props) => { 

    const [username, setUsername] = useState("");
    const [body, setBody] = useState("");
    const onLoad = async() => {
    }

    return (
        <div>
            <h4>notification</h4>
        </div>
    );
}

export default Notification;