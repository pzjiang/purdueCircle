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




const DiscoverUsers = props => {

    return (
        <div>
            User's Name: {props.firstname} {props.lastname}
            <br></br>
            Username: <Link to={"/profile/" + props.username}>{props.username} </Link>
        </div>
    )
}


export default DiscoverUsers;

