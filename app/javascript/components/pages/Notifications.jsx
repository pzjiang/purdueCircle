/**
 * Notifications page
 * shows all of the notifications a user has
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
 import { useUserState } from "../../contexts/user";
 import Layout from '../objs/Layout';
 
 const Notifications = () => {

    const { user } = useUserState();

    const [notifs, setNotifs] = useState("");

    const onLoad = async () => {

        try {
            //get all notifications

        } catch (error) {
            //console.log(error.response.data.error);
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
        <Layout>
        <h2>Notifications</h2>
        <div className="notifsList">
                {/*notifs.map((notif) => (
                    <Notification/>
                ))*/}
            </div>
        </Layout>
    );
 };
 
 
 export default Notifications;