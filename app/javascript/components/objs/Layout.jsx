/**
 * Layout for all of the pages
 * Contains components that will be same across all pages
 */

import React from "react";
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

const Layout = props => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            //console.log("success");
            navigate('/');
            addToast("Successfully logged out!", { appearance: 'success', autoDismiss: true });
        } catch (error) {
            //console.log("error found");
            //addToast("Logout failed!", { appearance: 'error', autoDismiss: true });
            console.log(error.toString());
        }

    }

    return (
        <div id="layout">
            <nav className="menu">
            <div className="smartphone-menu-trigger"></div>
            <header className="avatar">
                    <img src="via.placeholder.com/150.PNG" />
                <h2>John D.</h2>
            </header>
            <ul>
                <li tabIndex="0"><Link to='/profile'>Profile</Link></li>
                <li tabIndex="0"><Link to='/discovery'>Discover</Link></li>
                <li tabIndex="0"><Link to='/followedTopics'>Followed Topics</Link></li>
                <li tabIndex="0"><Link to='/messenger'>Messages</Link></li>
                <li tabIndex="0"><button onClick={handleSubmit}> Logout </button></li>
            </ul>
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