import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import profileApi from '../../apis/apiprofile';
import { useUserState } from "../../contexts/user";
import { useToasts } from 'react-toast-notifications';
import Layout from "../objs/Layout";

const EditProfile = () => {

    const [inputValues, setInputValues] = useState({
        bio: '',
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

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <label>
                    change bio:
                    <textarea value={inputValues.bio} onChange={(e) => setInputValues({ ...inputValues, bio: e.target.value })}></textarea>
                </label>
                <input type="submit" value="Submit" />

            </form>
        </Layout>
    )

}

export default EditProfile;
