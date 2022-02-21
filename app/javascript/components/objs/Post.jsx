/**
 * Post UI
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
import postsApi from "../../apis/apiposts";

const Post = () => {

    /*
        title
        body
        likes
        profile_id (which profile it belongs to)
        id
    */

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [likes, setLikes] = useState("");
    const [loaded, setLoaded] = useState(false);

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();

    /**
     * Load post information
     */
     useEffect(() => {
        onLoad();
    });

    const onLoad = async () => {
        if (loaded == true) {
            return;
        }
        setLoaded(true);
        try {
            const {
                data: { post },
            } = await postsApi.getPost();

            //console.log(post.profile_id);
            console.log(typeof post);
            //setTitle(post.title);
            console.log("successful post load");
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
    }

    const countLikes = () => {

    };

    const addComment = () => {

    };

    const savePost = () => {

    };

    return (
        <div id="post">
            <h1>{title}</h1>
            <div>{body}</div>

            <p></p>
        </div>
    );
}


export default Post;