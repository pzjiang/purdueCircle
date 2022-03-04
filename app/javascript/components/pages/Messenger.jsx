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

const Messenger = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        console.log("on load");

        try {
            const { data } = await messagesApi.getMessage();
            //setPosts(data.response);

            console.log(data);
            setMessages(data.messages);

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
        <Layout>

            <h1>My Message</h1>

            <div class="DM-list">

            </div>

            <DM />
            
        </Layout>
    )

}


export default Messenger;