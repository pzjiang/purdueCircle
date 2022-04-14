/**
 * Layout for all of the pages
 * Contains components that will be same across all pages
 */

import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
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
import { useToasts } from 'react-toast-notifications';
import profileApi from "../../apis/apiprofile";
import { useUserState } from "../../contexts/user";

const Layout = props => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const { user } = useUserState();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {

        try {
            const {
                data
            } = await profileApi.getprofile({ user_id: user.id });

            setFirstName(user.first_name);
            setLastName(user.last_name);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            navigate('/');
            addToast("Successfully logged out!", { appearance: 'success', autoDismiss: true });
        } catch (error) {
            console.log(error.toString());
        }

    }

    return (
        <div id="layout">
            <nav className="menu">
            <div className="smartphone-menu-trigger"></div>
            <header className="avatar">
                    <img src="via.placeholder.com/150.PNG" />
                <h2>{first_name} {last_name}</h2>
            </header>
            <ul>
                <li tabIndex="0"><Link to='/profile'>Profile</Link></li>
                <li tabIndex="0"><Link to='/discovery'>Discover</Link></li>
                <li tabIndex="0"><Link to='/followedTopics'>Followed Topics</Link></li>
                <li tabIndex="0"><Link to='/messenger'>Messages</Link></li>
            </ul>
            <button className="logout" onClick={handleSubmit}> Logout </button>
            </nav>

            <div className="header">
                <ul>
                    <li><Link to='../../'>PurdueCircle</Link></li>
                    <li><Link to='' title='Notifications'><i>bell</i></Link></li>
                    <li><Link to='/post' className="button-1 newPost"> New Post</Link></li>
                </ul>
            </div>

            <div id="layout-children">
                <div className="helper">
                {props.children}
                </div>
            </div>

        </div>
    );
}


export default Layout;