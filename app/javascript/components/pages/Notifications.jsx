/**
 * Notifications page
 * shows all of the notifications a user has
 */

import React, { useEffect, useState } from 'react';
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
import notificationsApi from "../../apis/apinotifications";
import Notification from '../objs/Notification';
import { useToasts } from 'react-toast-notifications';
const Notifications = () => {

    const { user } = useUserState();

    const [notifs, setNotifs] = useState([]);
    const [number, setNumber] = useState(10);
    const { addToast } = useToasts();

    useEffect(() => {
        onLoad();
    }, [])

    const onLoad = async () => {

        try {
            //get all notifications
            const { data } = await notificationsApi.getNotifications({ user_id: user.id, number: number });
            if (data.notifications != null) {
                console.log("bro please");
                setNotifs(data.notifications);
            }
            else {
                console.log("bro why");
            }
            console.log(data.notifications);
            /*
            if (notifs == null) {
                setNotifs([]);
            }
            */

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
    const deleteAll = async () => {
        try {
            await notificationsApi.deleteAllNotifications({ id: user.id });
            addToast("notifications deleted successfully", { appearance: 'success', autoDismiss: true });
            setNotifs([]);
        } catch (error) {
            addToast("could not delete all notifications", { appearance: 'error', autoDismiss: true });
        }
    }

    return (
        <Layout>
            <h2>Notifications</h2>
            <button onClick={deleteAll}>Delete all notifications</button>
            <div className="notifsList">
                {notifs.map((notif) => (
                    <Notification timestamp={notif.created_at} id={notif.id} body={notif.body} type={notif.origin} source={notif.source} />
                ))}
            </div>
        </Layout>
    );
};


export default Notifications;