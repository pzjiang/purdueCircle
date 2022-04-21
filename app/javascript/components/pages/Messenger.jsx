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
import '../../styling/Messenger.scss';
import messagesApi from "../../apis/apimessages";
import userApi from "../../apis/apiusers";
import ConcatenatedModule from "webpack/lib/optimize/ConcatenatedModule";
import { useUserState } from "../../contexts/user";

const Messenger = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    //const { index } = useParams();
    const [convos, setConvos] = useState([]);
    const [newUserDM, setNewUserDM] = useState("");
    const { user } = useUserState();
    //const [secUser, setSecUser] = useState("");

    const [currentConvo, setCurrentConvo] = useState("");
    let convosExist = false;

    useEffect(() => {
        onLoad();

    }, []);

    const onLoad = async () => {
        console.log("on load");

        try {
            const { data } = await messagesApi.getConvos({ user_id: user.id });
            setConvos(data.convos);

            console.log(data);

            if (convos.length > 0) {
                convosExist = true;
                setCurrentConvo(convos[0]);
            }

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

    const viewDM = (event, convoId) => {
        if (event != null) {
            event.preventDefault();
        }
        console.log("viewing convo");
        navigate(`/dm/${convoId}`);
    }


    async function getUserInfo(userId) {
        try {
            //event.preventDefault();
            const { data } = await userApi.getUser({ user_id: userId });
            setSecUser(data);

            console.log(data);

            //return data;
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

    const hasUnread = async () => {
        return false;
        if (true) {
            return true;
        }
        return false;
    }

    const createConvo = async (event) => {
        let thisId = 0;
        event.preventDefault();
        try {
            //get user id
            //console.log(newUserDM);
            const { data } = await userApi.findUser({ name: newUserDM });
            console.log(data);
            console.log(data.user.id);
            thisId = data.user.id;


        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
            return;
        }
        try {
            const { data } = await messagesApi.createConvo({ user_id: user.id, target_id: thisId });
            //console.log(data);
            viewDM(null, data.convo.id);

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

            <h1>My Messages</h1>

            <div className="newConvo">
                <form onSubmit={createConvo}>
                    <label>Start DM with:
                        <input type="text" value={newUserDM} onChange={(e) => setNewUserDM(e.target.value)} />
                    </label>
                </form>
            </div>

            <div className="convo-list">
                <p>current convos:</p>
                {convos.reverse().map((convo) => (
                    <div key={convo.id} id="convo">
                        <p>user: {user.username}<br /></p>
                        <p>Last message: </p>
                        <div>{(hasUnread && convo.first_user_id == user.id) &&
                            <p>New messages from {convo.second_name}</p>
                        }
                            {(hasUnread && convo.sec_user_id == user.id) &&
                                <p>New messages from {convo.first_name}</p>
                            }
                        </div>
                        <button onClick={(event) => viewDM(event, convo.id)}>View DM</button>

                    </div>
                ))}
            </div>

            <div className="current-convo">
                {
                    convosExist &&
                    <div>
                        <DM convoId={currentConvo.id} />
                    </div>
                }

            </div>



        </Layout>
    )

}


export default Messenger;