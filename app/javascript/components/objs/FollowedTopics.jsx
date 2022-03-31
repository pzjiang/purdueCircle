import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { useUser, useUserState } from "../../contexts/user";
import authenticationApi from '../../apis/authentication';
import { useToasts } from 'react-toast-notifications';
import userApi from "../../apis/apiusers";
import Layout from "./Layout.jsx";
import topicsApi from "../../apis/apitopics";
import postsApi from "../../apis/apiposts";
import Post from "./Post";

const FollowedTopics = props => {

    const [ posts, setPosts ] = useState([]);
    const { user } = useUserState();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        console.log("on load");
        let followedTopics = [];

        try {
            const { data } = await topicsApi.followedTopicPosts({id: user.id});
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

    return (
        <Layout>
            <h1>Followed topics</h1>
            <div className="postList">
                {posts.reverse.map((post) => (
                    <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                ))}
            </div>
        </Layout>
    )
}

export default FollowedTopics;

