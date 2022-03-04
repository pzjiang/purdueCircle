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

 const Message = (props) => { 

    return (
        <div class="message">
            {text}
        </div>
    );
}

export default Message;