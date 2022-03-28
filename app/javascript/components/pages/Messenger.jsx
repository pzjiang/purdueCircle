import React, { useEffect, useState } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import postsApi from "../../apis/apiposts";
import { resetAuthTokens } from "../../apis/axios";
import { useAuthDispatch } from "../../contexts/auth";
import { useToasts } from 'react-toast-notifications';
import Layout from "../objs/Layout";
import DM from "../objs/DM";
import Conversations from "../objs/Converations";
import Users from "../objs/User";
import '../../styling/Messenger.scss';
import messagesApi from "../../apis/apimessages";
import { Link } from "react-router-dom";

const Messenger = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const convos = null;

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
        console.log("on load");

        try {
            const { data } = await messagesApi.getConvos({ user_id: thisId });
            convos = data.response;

            console.log(data);

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

    const viewDM = () => {
        navigate(`/dm/${id}`)
    }

    const hasUnread = async () => {
        if (true) {
            return true;
        }
        return false;
    }

    return (
        <Layout>

            <h1>My Messages</h1>

            <div className="convo-list">
                {convos.map((convo) => (
                    <div id="convo">
                        <p>{convo.sec_user_id}</p>
                        <p>Last message: </p>
                        <p>{ hasUnread() && 
                            <p>New messages from {convo.sec_user}</p>
                        }</p>
                        <Button onClick={viewDM}>View DM</Button>
                        
                    </div>
                    ))}
            </div>

        </Layout>
    )

}


export default Messenger;