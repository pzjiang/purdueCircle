/**
 * Profile UI
 * Public information that will be displayed to all users
 */

import React from "react";
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

const Profile = () => {

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(user.id);

        try {
            await authenticationApi.deleteaccount({ id: user.id });
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("destroyed account ");
            navigate('/');
            addToast("Account destroyed successfully", { appearance: 'error', /*autoDismissTimeout: 1500,*/ });

        } catch (error) {
            addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
        }


    }


    return (
        <div>
            Testing account id access
            <button onClick={handleSubmit}> Destroy Account</button>
            <p>{/*user.profile.bio*/}</p>

        </div>
    );
}


export default Profile;