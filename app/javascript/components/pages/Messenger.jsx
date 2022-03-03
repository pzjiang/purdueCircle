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

const Messenger = () => {

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

    return (
        <Layout>

            <h1>My Feed</h1>
            <div className="postList">
                {posts.reverse().map((post) => (
                    <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                ))}
            </div>
        </Layout>
    )

}


export default Messenger;