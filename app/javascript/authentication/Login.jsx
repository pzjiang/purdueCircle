import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { setAuthHeaders } from '../apis/axios';
import authenticationApi from '../apis/authentication';
import { useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
import { validateEmail, validatePassword, validateName } from './validations';
import { useToasts } from 'react-toast-notifications';

import "../styling/Login.scss";

const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
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
        console.log("starting values");
        console.log(inputValues.email);
        console.log(inputValues.password);
        console.log("end values");

        try {
            setLoading(true);
            //console.log("starting tests");
            const {
                data: { auth_token, user },
            } = await authenticationApi.login({ user: { email: inputValues.email, password: inputValues.password } });
            //console.log(user.email);

            //console.log("checkpoint 4");
            authDispatch({ type: 'LOGIN', payload: { auth_token, email: inputValues.email } });
            //console.log("checkpoint 3");
            userDispatch({ type: 'SET_USER', payload: { user } });
            //console.log("checkpoint 2");
            setAuthHeaders();
            //console.log("checkpoint 1");
            //history.push('/');
            console.log("Logged in successfully!");
            setLoading(false);
            navigate('/');
            addToast('Logged in successfully', { appearance: 'success', autoDismiss: true });
        } catch (error) {
            console.log("some sort of error occurred");
            console.log(error.toString());
            addToast(error.response.data.error, { appearance: 'error', autoDismiss: true });
        } finally {
            setLoading(false);
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
                sign in
            </h1>

            <h2>
                we're happy to see you back!
                <br></br> 
                sign in again to explore your favorite topics and interact with others.
            </h2>

            <form
                onSubmit={handleSubmit}
            >
                <label>
                    <input type="text" placeholder="email" value={inputValues.email} onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                    />
                </label>
                <label>
                    <input type="password" placeholder="password" value={inputValues.password} onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                    />
                </label>

                <button type="submit"> sign in </button>
            </form>

            <li><Link to='/'>Forgot your password?</Link></li>

            <br>
            </br>

            <h3>
                don't have an account yet?
            </h3>
            <Link to="/signup">
            <button id="small_button">
                sign up
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

        </div>
    );

};

/*
Login.propTypes = {
    history: PropTypes.object,
};
*/

export default Login;
