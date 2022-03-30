import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import profileApi from '../../apis/apiprofile';
import { useUserDispatch, useUserState } from "../../contexts/user";
import { useToasts } from 'react-toast-notifications';
import Layout from "../objs/Layout";
import registrationApi from '../../apis/registrations';

import '../../styling/ProfileEdit.scss';

import { useAuthDispatch } from "../../contexts/auth";
//import { useUserDispatch } from '../../contexts/user';
import authenticationApi from '../../apis/authentication';
import { resetAuthTokens } from "../../apis/axios";

import "../../styling/Profile.scss";

import userApi from '../../apis/apiusers';


const EditProfile = () => {

    const [inputValues, setInputValues] = useState({
        bio: '', currentpassword: '', passwordnew: '', passwordConfirmation: '', password: '', email: '', first_name: '', last_name: '', username: ''
    });
    const { addToast } = useToasts();
    const { user } = useUserState();
    const navigate = useNavigate();
    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();


    useEffect(() => {
        setInputValues({ ...inputValues, email: user.email })
        setInputValues({ ...inputValues, first_name: user.first_name })
        setInputValues({ ...inputValues, last_name: user.last_name })
        setInputValues({ ...inputValues, username: user.username })

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await profileApi.editprofile({ id: user.id, profile: { bio: inputValues.bio } });
            console.log("successful edit profile");
            navigate("/profile");
            addToast("Profile changed successfully", { appearance: 'success', /*autoDismissTimeout: 1500,*/ });

        } catch (error) {
            //addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    }

    const changePrivacy = async (event) => {
        event.preventDefault();

        try {
            const { data } = await userApi.changePrivacy({ id: user.id });

            userDispatch({ type: 'SET_USER', payload: { user: data.user } });
            //console.log(data.user);
            navigate("/profile");
            addToast(`changed privacy setting successfully`, { appearance: 'success', autoDismiss: true });

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    }

    /*
    const editBio = async (event) => {
        <div class="form">
            <form onSubmit={handleSubmit} id="formBio">
                <h3>Change Bio:</h3>
                <label>
                    <br></br>
                    <textarea value={inputValues.bio} id="label" onChange={(e) => setInputValues({ ...inputValues, bio: e.target.value })}></textarea>
                </label>
                <br></br>
                <button><input type="submit" value="Submit" /></button>
    
            </form>
        </div>
    }
    
    const editPassword = async (event) => {
        console.log("edit Password");
    }
    */

    const updatePassword = async (event) => {
        event.preventDefault();
        try {
            await registrationApi.updatePassword({ user: { email: user.email, password: inputValues.passwordnew, password_confirmation: inputValues.passwordConfirmation, current_password: inputValues.currentpassword } });
            //console.log("successful edit profile");
            navigate("/profile");
            addToast("Password changed successfully", { appearance: 'success', autoDismiss: true });
        } catch (error) {
            addToast(error.response.data.error, { appearance: 'error', autoDismiss: true });
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    }
    /*
    const updateEmail = async (event) => {
        event.preventDefault();
        try {
            await registrationApi.update({ id: user.id, user: { id: user.id, email: user.email, password: inputValues.password } });
            //console.log("successful edit profile");
            navigate("/profile");
            addToast("Email changed successfully", { appearance: 'success', autoDismiss: true });
        } catch (error) {
            addToast(error.response.data.error, { appearance: 'error', autoDismiss: true });
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    }
    */

    const updateAccount = async (event) => {
        //console.log(user.id);
        event.preventDefault();
        try {
            const { data } = await registrationApi.update({ user: { email: user.email, username: inputValues.username, first_name: inputValues.first_name, last_name: inputValues.last_name, current_password: inputValues.currentpassword } });
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();

            //console.log("success");

            navigate('/');
            addToast("Account successfully changed please logged in again!", { appearance: 'success', autoDismiss: true, });
        } catch (error) {
            //addToast(error.response.data.error, { appearance: 'error', autoDismiss: true });
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    }

    return (
        <Layout>
            <div className="editProfileForm">
                <h1 id="edit_h1"> Edit Profile </h1>

                <br />
                <br />

                <h2 id="edit_h2"> Edit Bio </h2>
                <form id="profileEditForm" onSubmit={handleSubmit}>
                    <label>
                        <textarea placeholder="Enter a bio" value={inputValues.bio} onChange={(e) => setInputValues({ ...inputValues, bio: e.target.value })}></textarea>
                    </label>
                    <button type="submit"> Submit </button>

                </form>

                <br />
                <br />
                <h2 id="edit_h2"> Change Password </h2>
                <form id="profileEditForm" onSubmit={updatePassword}>
                    <label>
                        <h4>Enter Your Current Password: </h4>
                        <input type="password" placeholder="Current Password" value={inputValues.currentpassword} onChange={(e) => setInputValues({ ...inputValues, currentpassword: e.target.value })}
                        />
                        <br></br>
                        <h4>Enter Your New Password: </h4>
                        <input type="password" placeholder="New Password" id="label" value={inputValues.passwordnew} onChange={(e) => setInputValues({ ...inputValues, passwordnew: e.target.value })}
                        />
                        <br></br>
                        <h4>Confirm Your New Password: </h4>
                        <input type="password" placeholder="Confirm Password" id="label" value={inputValues.passwordConfirmation} onChange={(e) => setInputValues({ ...inputValues, passwordConfirmation: e.target.value })}
                        />
                        <br></br>
                        <br></br>
                    </label>
                    <button type="submit" id="submit-button"> Change Password </button>
                </form>

                <br></br>
                <br></br>

                <button onClick={changePrivacy}> Change privacy </button>

                {/*
            <form onSubmit={updateName} id="form">
                <h3>Change Name:</h3>
                <label id="password-labels">
                    <h4>Enter Updated First Name: </h4>
                        <input type="text" placeholder="First Name" id="label" value={inputValues.first_name} onChange={(e) => setInputValues({ ...inputValues, first_name: e.target.value })}
                    />

                    <input type="password" placeholder="Confirm Password" value={inputValues.passwordConfirmation} onChange={(e) => setInputValues({ ...inputValues, passwordConfirmation: e.target.value })}
                    />
                </label>
                <button type="submit"> Change Password </button>

            </form>
            */}
            </div>
        </Layout>
    )

}

export default EditProfile;
