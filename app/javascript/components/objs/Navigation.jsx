/**
 * Navigation bar
 */

 import React, { useState } from 'react';
 import {
     BrowserRouter as Router,
     Switch,
     Route,
     Link,
     useNavigate
 } from "react-router-dom";
 import authenticationApi from "../../apis/authentication";
 import { resetAuthTokens } from "../../apis/axios";
 import { useAuthDispatch } from "../../contexts/auth";
 import { useToasts } from 'react-toast-notifications';
 import '../../styling/Navigation.css';

const Navigation = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("success");
            navigate('/');
            addToast("Successfully logged out!", { appearance: 'success', autoDismissTimeout: 1500, });
        } catch (error) {
            console.log("error found");
            addToast("Logout failed!", { appearance: 'error', autoDismissTimeout: 1500, });
            console.log(error.toString());
        }

    }

    return (
        <div id="nav">
            <ul>
                <li><Link to='../pages/main'> home</Link></li>
                <li><Link to='../pages/createPost'> New Post</Link></li>
                <li><Link to='../pages/profile'> Profile</Link></li>
                <li><button onClick={handleSubmit}> logout</button></li>
            </ul>
        </div>
    );
}


export default Navigation;