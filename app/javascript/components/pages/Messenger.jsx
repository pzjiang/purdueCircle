import React, { useEffect, useState } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate, 
    useParams,
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

const Messenger = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    //const { index } = useParams();
    const [convos, setConvos] = useState([]);
    const [newUserDM, setNewUserDM] = useState("");

    useEffect(() => {
        

    }, []);

    const onLoad = async (thisId) => {
        console.log("on load");

        try {
            const { data } = await messagesApi.getConvos({ user_id: thisId });
            setConvos(data.convos);

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
        navigate(`/dm/${id}`);
    }

    const hasUnread = async () => {
        if (true) {
            return true;
        }
        return false;
    }

    const createConvo = async() => {
        messagesApi.createConvo();
        viewDM();
    }

    return (
        <Layout>

            <h1>My Messages</h1>

            <div className="newConvo">
                <form onSubmit={createConvo}>
                    <label>Start DM with: 
                        <input type="text" value={newUserDM} onChange={(e) => setNewUserDM(e.target.value)}/>
                    </label>
                </form>
            </div>

            <div className="convo-list">
                {convos.map((convo) => (
                    <div id="convo">
                        <p>{convo.sec_user_id}</p>
                        <p>Last message: </p>
                        <p>{ hasUnread && 
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