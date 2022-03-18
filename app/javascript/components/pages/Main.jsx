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



const Main = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [posts, setPosts] = useState([]);
    const [numberLoaded, setNumberLoaded] = useState(4);

    useEffect(() => {
        onLoad();
    }, [numberLoaded]);

    const onLoad = async () => {
        console.log("on load");

        try {
            const { data } = await postsApi.getPost({ number: numberLoaded });
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setNumberLoaded(numberLoaded + 4);
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
            {/*
            <button onClick={handleSubmit}> Destroy Account</button>
            <Link to='/'>Back home</Link>
            */}

            <h1>My Feed</h1>
            <div className="postList">
                {posts.reverse().map((post) => (
                    <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                ))}
            </div>

            <button onClick={handleSubmit} > Load More</button>
        </Layout>
    )

}


export default Main;