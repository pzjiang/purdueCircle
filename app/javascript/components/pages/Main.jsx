import React from "react";

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

import Layout from "../objs/Layout";
import "../../styling/CreatePost.css";

const Main = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user.id);
        /*
        try {
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("success");
            navigate('/');
            addToast("Successfully logged out!", { appearance: 'success', autoDismissTimeout: 1500, });
        } catch (error) {
            console.log("error found");
            addToast("Logout failed!", { appearance: 'error', autoDismissTimeout: 1500, });
            console.log(error.toString());
        }
        */
    }


    return (
        <Layout>
            logout button testing

            <br />
            <button onClick={handleSubmit}> Destroy Account</button>
            <Link to='/'>Back home</Link>


            <h1>Posts</h1>
            <div className="postList">
                <div className="post" id="post-1">
                    
                    <div className="time-stamp"><div id="input">10:50 PM</div></div>
                    <div className="postedby"><div id="input">Posted By</div></div>

                    <div className="topics"><div id="input"><b>Post Topics: </b>Topic 1, Topic 2, Topic 3</div></div>

                    <br></br>

                    <div id="textarea">Content</div>
                </div>

                <hr />

                <div className="post" id="post-2">
                    
                    <div className="time-stamp"><div id="input">10:50 PM</div></div>
                    <div className="postedby"><div id="input">Posted By</div></div>

                    <div className="topics"><div id="input"><b>Post Topics: </b>Topic 1, Topic 2, Topic 3</div></div>

                    <br></br>

                    <div id="textarea">Content</div>
                </div>

                <hr />

                <div className="post" id="post-3">
                    
                    <div className="time-stamp"><div id="input">10:50 PM</div></div>
                    <div className="postedby"><div id="input">Posted By</div></div>

                    <div className="topics"><div id="input"><b>Post Topics: </b>Topic 1, Topic 2, Topic 3</div></div>

                    <br></br>

                    <div id="textarea">Content</div>
                </div>
            </div>
        </Layout>
    )

}


export default Main;