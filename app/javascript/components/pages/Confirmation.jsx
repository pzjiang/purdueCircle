import React, { useEffect, useState } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import postsApi from "../../apis/apiposts";
import { resetAuthTokens } from "../../apis/axios";
import { useAuthDispatch } from "../../contexts/auth";
import { useToasts } from 'react-toast-notifications';

import Layout from "../objs/Layout";
import Post from "../objs/Post";
import "../../styling/CreatePost.scss";



const Confirmation = (confirmation_token) => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [posts, setPosts] = useState([{ title: "title", body: "test body", id: 1 }]);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        console.log("on load");

        try {
            const { data } = await postsApi.getPost();
            //setPosts(data.response);

            console.log(data);
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user.id);
        /*
        try {
            await authenticationApi.logout();
            authDispatch({ type: 'LOGOUT' });
            resetAuthTokens();
            console.log("success");
            navigate('/');
            addToast("Successfully logged out!", { appearance: 'success', autoDismissTimeout: 1500, });
        } catch (error) {
            console.log("error found");
            addToast("Logout failed!", { appearance: 'error', autoDismissTimeout: 1500, });
            console.log(error.toString());
        }
        */
    }


    return (
        <Layout>
            logout button testing

            <br />
            <button onClick={handleSubmit}> Destroy Account</button>
            <Link to='/'>Back home</Link>


            <h1>Posts</h1>
            <div className="postList">
                {posts.map((post) => (
                    <Post title={post.title} body={post.body} likes={0} liked={false} id={post.id} key={post.id} />
                ))}
            </div>
        </Layout>
    )

}


export default Confirmation;