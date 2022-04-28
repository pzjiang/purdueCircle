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
import { useAuthDispatch } from "../../contexts/auth";
import { resetAuthTokens } from "../../apis/axios";
import { useToasts } from 'react-toast-notifications';
import userApi from "../../apis/apiusers";
import Layout from "./Layout.jsx";

import profileApi from "../../apis/apiprofile";

import '../../styling/DiscoverUsers.scss';




const DiscoverUsers = props => {

    //const { user } = useUserState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        onLoad(props.userid);
    }, []);

    const onLoad = async () => {

        try {
            const {
                data
            } = await profileApi.getprofile({ user_id: props.userid });

            //console.log(data.profile.user_id);
            //console.log(user.first_name);

            setPhoto(data.profile.photo);

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
        <div>
            {photo == null &&
                <span className="dot"></span>
            }
            {photo != null &&
                <img class="profilepic" src={photo}></img>
            }
            {/* <img class="profilepic" src={props.profilepic}></img> */}
            <br></br>
            User's Name: {props.firstname} {props.lastname}
            <br></br>
            Username: <Link to={"/profile/" + props.username}>{props.username} </Link>
            <br></br>
            <br></br>
        </div>
    )
}


export default DiscoverUsers;

