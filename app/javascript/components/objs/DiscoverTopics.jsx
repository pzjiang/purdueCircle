import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { useUserState } from "../../contexts/user";
import authenticationApi from '../../apis/authentication';
import { useToasts } from 'react-toast-notifications';
import userApi from "../../apis/apiusers";
import Layout from "./Layout.jsx";
import topicsApi from "../../apis/apitopics";



const DiscoverTopics = props => {


    const followTopic = async () => {
        console.log("click");
        try {
            const { data } = await topicsApi.followTopic({ id: props.id, name: props.name });
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
        <div>
            Topic Name:
            <Link to="/"> {props.name} </Link>
            <br></br>
            <button onClick={() => followTopic()}> Follow Topic</button>
        </div >
    )
}


export default DiscoverTopics;

