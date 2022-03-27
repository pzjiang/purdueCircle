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




const DiscoverTopics = props => {

    return (
        <div>

        </div>
    )
}


export default DiscoverTopics;

