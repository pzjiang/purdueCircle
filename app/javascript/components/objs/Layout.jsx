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
//import Notifications from "react-notifications-menu";
import notificationsApi from "../../apis/apinotifications";
import logo from "../../assets/default_bell";


const DEFAULT_NOTIFICATION = {
    image:
        "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago"
};


const Layout = props => {

    //user profile
    const { user } = useUserState();
    const [avatar, setAvatar] = useState();

    //notification menu
    const [notifs, setNotifs] = useState(DEFAULT_NOTIFICATION)

    //toast notifications
    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {

        try {
            const {
                data
            } = await profileApi.getprofile({ user_id: user.id });

            if (data.profile.photo != null && data.profile.photo != "") {
                setAvatar(data.profile.photo);
            }


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

    function viewAll() {
        event.preventDefault();
        console.log("clicked");
        navigate(`/notifications`);
    }

    return (
        <div id="layout">
            <nav className="menu">
                <div className="smartphone-menu-trigger"></div>
                <div className="homeButton">
                    <Link to='../../'>
                        <h2>PurdueCircle</h2>
                    </Link>
                </div>
                <header className="avatar">
                    {avatar == null &&
                        <img src="via.placeholder.com/150.PNG" />
                    }
                    {avatar != null &&
                        <img src={avatar} width={100} height={100} ></img>
                    }
                    <h2>{user.first_name} {user.last_name}</h2>
                </header>
                <ul>
                    <li tabIndex="0"><Link to='/profile'>Profile</Link></li>
                    <li tabIndex="0"><Link to='/discovery'>Discover</Link></li>

                    <li tabIndex="0"><Link to='/messenger'>Messages</Link></li>
                </ul>
                <button className="logout" onClick={handleSubmit}> Logout </button>
            </nav>

            <div className="header">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li>
                        {/*
                        <Notifications data={notifs}
                            header={{
                                title: "Notifications Menu",
                                option: { text: "View All", onClick: () => viewAll() }
                            }}
                            markAsRead={(notifs) => {
                                console.log(notifs);
                            }}
                        />
                        */}
                        <Link to='/notifications'><img src={logo} height={25} width={25}></img></Link>
                    </li>
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