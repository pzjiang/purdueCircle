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
import '../../styling/Post.scss';

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
    const [liked, setLiked] = useState(false);
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
                data: { posts },
            } = await postsApi.getPost();

            for (let post of posts) {
                console.log(post.title);
                console.log(post.body);
                console.log(post.likes);
                setTitle(post.title);
                setBody(post.body);
                setLikes(post.likes);
            }

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

    /**
     * user likes the post
     */
    const addLike = () => {
        console.log("like clicked");
        if (liked == true) {
            setLiked(false);

            //decrease like count
            setLikes(likes-1);
            console.log("unliked");
        } else {
            setLiked(true);

            //increase like count
            setLikes(likes+1);
            console.log("liked");
        }
    }

    const addComment = () => {
        console.log("add comment")
    };

    const savePost = () => {

    };

    const editPost = () => {
        console.log("edit post");
    }

    const deletePost = () => {
        console.log("delete post");
    }

    const reportPost = () => {
        console.log("rep post");
    }

    return (
        <div id="post">
            <h1>{title} title</h1>
            <div>{body} body</div>
            
            <p></p>
            <div className="reactions">
                <button className="like" onClick={addLike}>
                    <i className="fa fa-heart" aria-hidden="true"></i> {likes}
                </button>
                <button className="comment" onClick={addComment}>
                    <i className="fa fa-comment" aria-hidden="true"></i> comment
                </button>
            </div>

            <div className="options">
                <button className="edit" onClick={editPost}>edit post</button>
                <button className="delete" onClick={deletePost}>delete post</button>
                <button className="report" onClick={reportPost}>report post</button>
            </div>
        </div>
    );
}


export default Post;