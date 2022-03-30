/**
 * Profile UI
 * Public information that will be displayed to all users
 */

import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { useUserState } from "../../contexts/user";
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from "../../contexts/auth";
import { resetAuthTokens } from "../../apis/axios";
import { useToasts } from 'react-toast-notifications';
import profileApi from "../../apis/apiprofile";
import Layout from "../objs/Layout";
import "../../styling/Profile.scss";
import Post from "../objs/Post";
import postsApi from "../../apis/apiposts";
import topicsApi from "../../apis/apitopics";

//import registrationApi from "../../apis/registrations";

const Profile = () => {

    const [biol, setBiol] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [privacy, setPrivacy] = useState(false);

    const [topics, setTopics] = useState([]);

    const [posts, setPosts] = useState([]);

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {

        try {
            const {
                data
            } = await profileApi.getprofile({ user_id: user.id });

            //console.log(data.profile.user_id);
            //console.log(data.profile.bio);
            //console.log(user);
            setBiol(data.profile.bio);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setUsername(user.username);
            setEmail(user.email);
            setPrivacy(user.privacy);

            //console.log("successful display bio");
        } catch (error) {
            //console.log(error.response.data.error);
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }

        try {
            const { data } = await postsApi.ownPosts({ user_id: user.id, number: 10 });
            //setPosts(data.response);

            //console.log(data);
            setPosts(data.posts);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }

        //get the topics that you follow
        try {
            const { data } = await topicsApi.followedTopics({ id: user.id });
            setTopics(data.topics);

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

    const removeTopic = async (param) => {

        try {
            const { data } = await topicsApi.unfollowTopic({ name: param, id: user.id });
            const newList = topics.filter((item) => item.id !== data.id);
            setTopics(newList);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(user.id);

        try {
            await authenticationApi.deleteaccount({ id: user.id });
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("destroyed account ");
            navigate('/');
            addToast("Account destroyed successfully", { appearance: 'error', });

        } catch (error) {
            addToast(error.response.data.error, { appearance: 'error', });
        }


    }


    return (
        <Layout>
            <div id="profile">

                <h1> My Profile </h1>

                <br />

                <div className="child">
                    <span className="dot"></span>
                </div>
                <div className="child">
                    <div id="name">
                        <h2> {first_name} {last_name} </h2>
                        <h2> @{username}</h2>
                    </div>
                </div>

                <br />
                <br />
                <h3></h3>
                <h3>Bio</h3>
                <p> {biol}</p>
                <h3>Email</h3>
                {privacy &&
                    <p> [ FILTERED ] </p>}
                {privacy == false &&
                    <p>{email}</p>}
                <h3>Topics</h3>
                <p> -- </p>
                {topics.map((topic) => (
                    <div> {topic.name} <button onClick={() => removeTopic(topic.id)}> Unfollow </button></div>
                ))}
            </div>

            <div className="postList">
                {posts.reverse().map((post) => (
                    <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                ))}
            </div>

            <table width="100%">
                <tr width="100%">
                    <td width="50%">
                        <button><Link to="/editprofile">Edit Profile</Link></button>
                    </td>
                    <td width="50%">
                        <button onClick={handleSubmit}> Delete Account</button>
                    </td>
                </tr>
            </table>
            <br></br>

        </Layout>
    );
}


export default Profile;