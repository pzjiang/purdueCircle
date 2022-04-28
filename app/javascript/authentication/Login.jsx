import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { setAuthHeaders } from '../apis/axios';
import authenticationApi from '../apis/authentication';
import { useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
//import { validateEmail, validatePassword, validateName } from './validations';
import { useToasts } from 'react-toast-notifications';

import "../styling/Login.scss";

const Login = () => {
    const [inputValues, setInputValues] = useState({
        login: '',
        password: '',
    });


    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    /*
    const handleChangePass = (event) => {
        this.setState({ password: event.target.value })
    };
    const handleChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    };
    */

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log("starting values");
        //console.log(inputValues.email);
        //console.log(inputValues.password);
        //console.log("end values");

        try {
            //setLoading(true);
            //console.log("starting tests");
            const {
                data: { auth_token, user },
            } = await authenticationApi.login({ user: { login: inputValues.login, password: inputValues.password } });
            //console.log(user.email);
            //console.log()

            //console.log("checkpoint 4");
            authDispatch({ type: 'LOGIN', payload: { auth_token, email: user.email } });
            //console.log("checkpoint 3");
            userDispatch({ type: 'SET_USER', payload: { user } });
            //console.log("checkpoint 2");
            setAuthHeaders();
            //console.log("checkpoint 1");
            //history.push('/');
            console.log("Logged in successfully!");
            //setLoading(false);
            navigate('/');
            addToast('Logged in successfully', { appearance: 'success', autoDismiss: true });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                addToast(error.response.data.error, { appearance: 'error', autoDismiss: true });
            } else if (error.request) {
                console.log(error.request);
                addToast(error.request, { appearance: 'error', autoDismiss: true });
            } else {
                console.log("error", error.message);
                addToast(error.message, { appearance: 'error', autoDismiss: true });
            }
        }
    };
    /*
    
    const handleSubmitExternally = async values => {
        const { email, password } = values;
        try {
            setLoading(true);
            const {
                data: { auth_token, user, is_admin },
            } = await authenticationApi.login({ user: { email, password } });
            authDispatch({ type: 'LOGIN', payload: { auth_token, email, is_admin } });
            userDispatch({ type: 'SET_USER', payload: { user } });
            setAuthHeaders();
            history.push('/');
            */
    /*
    toast({
        description: 'Logged in successfully.',
        status: 'success',
        duration: 1500,
        isClosable: true,
    });
    */
    /*
     console.log("logged in successfully!");
 } catch (error) {
     /*
     toast({
         description: 'Incorrect email or password',
         status: 'error',
         duration: 1500,
         isClosable: true,
     });
     */
    /*
     console.log("incorrect password or email!");
 } finally {
     setLoading(false);
 }
};
*/



    return (
        <div className="Login">
            <h1>
                Sign In
            </h1>

            <h2>
                Catch up on what you missed while you were gone.
            </h2>

            <form
                onSubmit={handleSubmit}
            >
                <br />

                <label>
                    <center>
                        <input type="text" placeholder="Email" value={inputValues.login} onChange={(e) => setInputValues({ ...inputValues, login: e.target.value })}
                        />
                    </center>
                </label>
                <label>
                    <center>
                        <input type="password" placeholder="Password" value={inputValues.password} onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                        />
                    </center>
                    
                </label>

                <button type="submit"> Sign In </button>

                <br />

            </form>

            <br>
            </br>

            <h3>
                Don't have an account yet? Create an account today.
            </h3>
            <Link to="/signup">
                <button>
                    Sign Up
                </button>
            </Link>

            {/*
            <h3>
                want to go back to the main page?
            </h3>
            <Link to='/'> 
            <button id="button">
                home
            </button>
            </Link>
            */}

        </div>
    );

};

/*
Login.propTypes = {
    history: PropTypes.object,
};
*/

export default Login;
