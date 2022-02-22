/**
 * Profile UI
 * Public information that will be displayed to all users
 */

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
import profileApi from "../../apis/apiprofile";
import Layout from "../objs/Layout";

import registrationApi from "../../apis/registrations";

const Profile = () => {

    const [biol, setBiol] = useState("");
    const [loaded, setLoaded] = useState(false);

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        onLoad();
        /*
        try {
            console.log("starts");
            const {
                data: { profile },
            } = profileApi.getprofile({ user_id: user.id });
            console.log(profile.user_id);
            console.log(profile.bio);
            setBiol(profile.bio);
            console.log("successful display bio");

        } catch (error) {
            //addToast(/*error.response.data.error"failed somewhere", { appearance: 'error', /*autoDismissTimeout: 1500, });
    console.log("fck lol");
}
        */
    });

    const onLoad = async () => {
        if (loaded == true) {
            return;
        }
        setLoaded(true);
        try {
            const {
                data: { profile },
            } = await profileApi.getprofile({ user_id: user.id });

            console.log(profile.user_id);
            console.log(profile.bio);
            setBiol(profile.bio);
            //console.log("successful display bio");
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
        //console.log(user.id);

        try {
            await authenticationApi.deleteaccount({ id: user.id });
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("destroyed account ");
            navigate('/');
            addToast("Account destroyed successfully", { appearance: 'error', });

        } catch (error) {
            addToast(error.response.data.error, { appearance: 'error', });
        }


    }


    return (
        <Layout>
            Testing account id access
            <button onClick={handleSubmit}> Destroy Account</button>
            <p> {biol}</p>
            <br />
            <br />

            <Link to="/editprofile">Link to edit profile</Link>
            <br></br>
            <Link to="/" >Link to the home page</Link>

        </Layout>
    );
}


export default Profile;