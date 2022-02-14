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



const Main = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("success");
            navigate('/');
        } catch (error) {
            console.log("error found");
            console.log(error.toString());
        }

    }

    return (
        <div>
            logout button testing
            <button onClick={handleSubmit}> logout</button>
            <br />

            <Link to='/'>Back home</Link>

        </div>
    )

}


export default Main;