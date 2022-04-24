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
        bio: '', currentpassword: '', passwordnew: '', passwordConfirmation: '', password: '', email: '', first_name: '', last_name: '', username: '', avatar: null
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
            await profileApi.editprofile({ id: user.id, profile: { bio: inputValues.bio, avatar: inputValues.avatar } });
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
            userDispatch({ type: 'SET_USER', payload: { user: data.user } });

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

                <button id="submit-button" onClick={changePrivacy}> Change Privacy </button>

                <br />

                <h2 id="edit_h2"> Edit Bio </h2>
                <form id="profileEditForm" onSubmit={handleSubmit}>
                    <label>
                        <textarea placeholder="Enter a bio" value={inputValues.bio} onChange={(e) => setInputValues({ ...inputValues, bio: e.target.value })}></textarea>
                    </label>
                    <label>
                        <input type="file" accept="image/*" multiple={false} onChange={(e) => setInputValues({ ...inputValues, avatar: e.target.files[0] })} />
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
                        <h4>Enter Your New Password: </h4>
                        <input type="password" placeholder="New Password" id="label" value={inputValues.passwordnew} onChange={(e) => setInputValues({ ...inputValues, passwordnew: e.target.value })}
                        />
                        <h4>Confirm Your New Password: </h4>
                        <input type="password" placeholder="Confirm Password" id="label" value={inputValues.passwordConfirmation} onChange={(e) => setInputValues({ ...inputValues, passwordConfirmation: e.target.value })}
                        />
                    </label>
                    <button type="submit" id="submit-button"> Change Password </button>
                    <br></br>
                </form>


                <br></br>
                <br></br>




                <form onSubmit={updateAccount} id="form">
                    <h3>Change Name:</h3>
                    <label id="password-labels">
                        <h4>Enter Updated First Name: </h4>
                        <input type="text" placeholder="First Name" id="label" value={inputValues.first_name} onChange={(e) => setInputValues({ ...inputValues, first_name: e.target.value })}
                        />
                        <h4>Enter Updated Last Name: </h4>
                        <input type="text" placeholder="Last Name" id="label" value={inputValues.last_name} onChange={(e) => setInputValues({ ...inputValues, last_name: e.target.value })}
                        />

                        <h4>Enter Updated username: </h4>
                        <input type="text" placeholder="User Name" id="label" value={inputValues.username} onChange={(e) => setInputValues({ ...inputValues, username: e.target.value })}
                        />

                        <h4>Enter Updated email: </h4>
                        <input type="text" placeholder="Email" id="label" value={inputValues.email} onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                        />

                        <input type="password" placeholder="Current Password" value={inputValues.currentpassword} onChange={(e) => setInputValues({ ...inputValues, currentpassword: e.target.value })}
                        />
                    </label>
                    <button type="submit"> update </button>

                </form>

                <br></br>
                <br></br>
            </div>
        </Layout>
    )

}

export default EditProfile;
