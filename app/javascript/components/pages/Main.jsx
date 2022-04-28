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
import { useUserDispatch, useUserState } from "../../contexts/user";

import Layout from "../objs/Layout";
import Post from "../objs/Post";
import "../../styling/CreatePost.scss";
import "../../styling/Main.scss";
import userReducer from "../../reducers/user";




const Main = () => {

    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [posts, setPosts] = useState([]);
    const [followedUsers, setUsers] = useState([]);
    const [followedTopics, setTopics] = useState([]);
    const [numberLoaded, setNumberLoaded] = useState(4);
    const [display, setDisplay] = useState("all");
    const { user } = useUserState();

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

        console.log("user.id: " + user.id);

        // followed topics
        try {
            const { data } = await postsApi.timeTopics({ number: numberLoaded, id: user.id });
            //setPosts(data.response);

            console.log("complete: " + data);
            setTopics(data.posts);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }

        // followed users
        try {
            const { data } = await postsApi.timeUsers({ number: numberLoaded, id: user.id });
            //setPosts(data.response);

            console.log("finished: " + data);
            setUsers(data.posts);

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

    const handleChange = (event) => {
        console.log("userid: " + user.id);
        console.log(event.target.value);
        setDisplay(event.target.value);
        if (event.target.value == 'all') {
            addToast("Now Displaying All Posts.", { appearance: 'success', autoDismiss: true });
        } else if (event.target.value == 'topics') {
            addToast("Now Displaying Posts With the Topics You Follow.", { appearance: 'success', autoDismiss: true });
        } else if (event.target.value == 'users') {
            addToast("Now Posts From Users You Follow.", { appearance: 'success', autoDismiss: true });
        }
    };

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

            <select onChange={handleChange} name="selectList" id="selectList">
                  <option value="all">View All</option>
                  <option value="topics">View Followed Topics Posts</option>
                <option value="users">View Followed Users Posts</option>
            </select>

            {
                display == "all" &&
                <div className="postList">
                    {posts.reverse().map((post) => (
                        <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                    ))}
                    <button onClick={handleSubmit} > Load More</button>
                </div>
            }

            {
                display == "topics" &&
                <div className="postList">
                    {followedTopics.reverse().map((post) => (
                        <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                    ))}
                    <button onClick={handleSubmit} > Load More</button>
                </div>
            }

            {
                display == "users" &&
                <div className="postList">
                    {followedUsers.reverse().map((post) => (
                        <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                    ))}
                    <button onClick={handleSubmit} > Load More</button>
                </div>
            }

            <br></br>
            <br></br>
        </Layout>
    )

}


export default Main;