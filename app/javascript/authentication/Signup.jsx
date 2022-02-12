import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PropTypes from 'prop-types';

import { setAuthHeaders } from '../apis/axios';
import authenticationApi from '../apis/authentication';
import { useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
import { validateEmail, validatePassword, validateName } from './validations';


const Signup = ({ history }) => {
    const [inputValues, setInputValues] = useState({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
    });

    const [loading, setLoading] = useState(false);
    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("signed in:");
        console.log(inputValues.email);
        console.log(inputValues.username);
        console.log(inputValues.lastName);
        console.log(inputValues.password);
        console.log(inputValues.passwordConfirmation);
        console.log("end");

        try {
            setLoading(true);
            const {
                data: { user, auth_token },
            } = await authenticationApi.signup({
                user: {
                    email: inputValues.email,
                    first_name: inputValues.firstName,
                    last_name: inputValues.lastName,
                    username: inputValues.username,
                    password: inputValues.password,
                    password_confirmation: inputValues.passwordConfirmation,
                },
            })
            console.log("checkpoint 1");
            authDispatch({
                type: 'LOGIN',
                payload: { auth_token, email: inputValues.email },
            });
            console.log("checkpoint 2");
            userDispatch({ type: 'SET_USER', payload: { user } });
            console.log("checkpoint3");
            //history.push('/');
            console.log("success");
        } catch (error) {
            console.log("failure to sign in");
            console.log(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <label>
                    Email:
                    <input type="text" value={inputValues.email} onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                    />
                </label>
                <label>
                    Password:
                    <input type="password" value={inputValues.password} onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                    />
                </label>
                <label>
                    Password:
                    <input type="password" value={inputValues.passwordConfirmation} onChange={(e) => setInputValues({ ...inputValues, passwordConfirmation: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    username:
                    <input type="text" value={inputValues.username} onChange={(e) => setInputValues({ ...inputValues, username: e.target.value })}
                    />
                </label>
                <label>
                    firstname:
                    <input type="text" value={inputValues.firstName} onChange={(e) => setInputValues({ ...inputValues, firstName: e.target.value })}
                    />
                </label>
                <label>
                    last name:
                    <input type="text" value={inputValues.lastName} onChange={(e) => setInputValues({ ...inputValues, lastName: e.target.value })}
                    />
                </label>

                <input type="submit" value="Submit" />
            </form>

            <Link to='/'> Home</Link>
            <br />
            <Link to="/login">Log In</Link>

        </div >
    );


}


Signup.propTypes = {
    history: PropTypes.object,
};

export default Signup;