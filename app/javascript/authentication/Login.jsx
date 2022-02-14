import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { setAuthHeaders } from '../apis/axios';
import authenticationApi from '../apis/authentication';
import { useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
import { validateEmail, validatePassword, validateName } from './validations';



const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();
    const navigate = useNavigate();
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
            console.log("starting tests");
            const {
                data: { auth_token, user },
            } = await authenticationApi.login({ user: { email: inputValues.email, password: inputValues.password } });

            console.log("checkpoint 4");
            authDispatch({ type: 'LOGIN', payload: { auth_token, email: inputValues.email } });
            console.log("checkpoint 3");
            userDispatch({ type: 'SET_USER', payload: { user } });
            console.log("checkpoint 2");
            setAuthHeaders();
            console.log("checkpoint 1");
            //history.push('/');
            console.log("successful login");
            navigate('/main');
        } catch (error) {
            console.log("some sort of error occurred");
            console.log(error.toString());
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

                <input type="submit" value="Submit" />
            </form>

            <Link to='/'> Home</Link>
            <br />
            <Link to="/signup">Sign up</Link>

        </div>
    );

};

/*
Login.propTypes = {
    history: PropTypes.object,
};
*/

export default Login;