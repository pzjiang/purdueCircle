import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import profileApi from '../../apis/apiprofile';
import { useUserState } from "../../contexts/user";
import { useToasts } from 'react-toast-notifications';
import Layout from "../objs/Layout";
import registrationApi from '../../apis/registrations';



const EditProfile = () => {

    const [inputValues, setInputValues] = useState({
        bio: '', currentpassword: '', password: '', passwordConfirmation: '',
    });
    const { addToast } = useToasts();
    const { user } = useUserState();
    const navigate = useNavigate();

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

    const updatePassword = async (event) => {
        event.preventDefault();
        try {
            await registrationApi.updatePassword({ user: {email: user.email}, password: inputValues.password, password_confirmation: inputValues.passwordConfirmation, current_password: inputValues.currentpassword} );
            console.log("successful edit profile");
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

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <label>
                    change bio:
                    <textarea value={inputValues.bio} onChange={(e) => setInputValues({ ...inputValues, bio: e.target.value })}></textarea>
                </label>
                <input type="submit" value="Submit" />

            </form>

            <form onSubmit={updatePassword}>
                <label>
                    <input type="password" placeholder="Current Password" value={inputValues.currentpassword} onChange={(e) => setInputValues({ ...inputValues, currentpassword: e.target.value })}
                    />
                </label>

                <label>
                    <input type="password" placeholder="New Password" value={inputValues.password} onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                    />

                    <input type="password" placeholder="Confirm password" value={inputValues.passwordConfirmation} onChange={(e) => setInputValues({ ...inputValues, passwordConfirmation: e.target.value })}
                    />
                </label>
                <button type="submit"> Change Password </button>
            </form>
        </Layout>
    )

}

export default EditProfile;
