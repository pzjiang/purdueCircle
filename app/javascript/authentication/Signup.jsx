import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import PropTypes from 'prop-types';

import { setAuthHeaders } from '../apis/axios';
import authenticationApi from '../apis/authentication';
import { useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
import { validateEmail, validatePassword, validateName } from './validations';
import { useToasts } from 'react-toast-notifications';

import "../styling/Signup.css";


const Signup = () => {
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
    const navigate = useNavigate();
    const { addToast } = useToasts();


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
            //console.log("checkpoint 1");
            authDispatch({
                type: 'LOGIN',
                payload: { auth_token, email: inputValues.email },
            });
            //console.log("checkpoint 2");
            userDispatch({ type: 'SET_USER', payload: { user } });
            //console.log("checkpoint3");
            //history.push('/');
            //console.log("success");
            setLoading(false);
            navigate('/');
            addToast("User successfully created!", { appearance: 'success', /*autoDismissTimeout: 1500,*/ });
        } catch (error) {
            console.log("failure to sign in");
            //console.log(error.toString());
            addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Signup">

            <h1>
                sign up
            </h1>

            <h2>
                fill in the information below to set up your PurdueCircle account.
            </h2>

            <form
                onSubmit={handleSubmit}
            >

                <div className="column">
                <label>
                    <input type="text" placeholder="email" value={inputValues.email} onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                    />
                </label>
                <label>
                    <input type="password" placeholder="password" value={inputValues.password} onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                    />
                </label>
                <label>
                    <input type="password" placeholder="confirm password" value={inputValues.passwordConfirmation} onChange={(e) => setInputValues({ ...inputValues, passwordConfirmation: e.target.value })}
                    />
                </label>
                </div>


                <div className="column">
                <label>
                    <input type="text" placeholder="username" value={inputValues.username} onChange={(e) => setInputValues({ ...inputValues, username: e.target.value })}
                    />
                </label>
                <label>
                    <input type="text" placeholder="first name" value={inputValues.firstName} onChange={(e) => setInputValues({ ...inputValues, firstName: e.target.value })}
                    />
                </label>
                <label>
                    <input type="text" placeholder="last name" value={inputValues.lastName} onChange={(e) => setInputValues({ ...inputValues, lastName: e.target.value })}
                    />
                </label>
                </div>

                <button type="submit"> sign up </button>
            </form>


            <br>
            </br>

            <h3>
                already have an account?
            </h3>
            <Link to="/login">
            <button id="small_button">
                sign in
            </button>
            </Link>

            <h3>
                want to go back to the main page?
            </h3>
            <Link to='/'> 
            <button id="small_button">
                home
            </button>
            </Link>


        </div >
    );


}


Signup.propTypes = {
    history: PropTypes.object,
};

export default Signup;
