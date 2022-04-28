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
import notificationsApi from "../../apis/apinotifications";
import { useToasts } from 'react-toast-notifications';

const Notification = (props) => {


    /*
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {

    }
    */
    const { addToast } = useToasts();


    const deleteNotification = async (event) => {
        event.preventDefault();
        try {
            await notificationsApi.deleteNotification({ id: props.id });
            addToast("notification deleted!", { appearance: 'success', autoDismiss: true,/*autoDismissTimeout: 1500,*/ });
        } catch (error) {
            addToast("failed to delete notification", { appearance: 'error', autoDismiss: true,/*autoDismissTimeout: 1500,*/ });
        }
    }

    return (
        <div>

            {props.type == 1 &&
                <div style={{ border: '2px solid black' }}>
                    <h3>Post Notification</h3>
                    <p>Sent at: {props.timestamp}</p>
                    <br />
                    <p>{props.body}</p>
                    <br />
                    <p><Link to={`/viewpost/${props.source}`}>View the post here!</Link> <button onClick={deleteNotification}> Delete Notification</button> </p>

                </div>
            }
            {props.type == 2 &&
                <div style={{ border: '2px solid black' }}>
                    <h3>Message Notification</h3>
                    <p>Sent at: {props.timestamp}</p>
                    <br />
                    <p>{props.body}</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p><Link to={`/dm/${props.source}`}>View the message here!</Link><br /> <br /> <br /><button onClick={deleteNotification}> Delete Notification</button> </p>
                </div >
            }

            <br />
            <br />
            <br />
        </div >
    );
}

export default Notification;