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

const Post = props => {

    /*
        title
        body
        likes
        profile_id (which profile it belongs to)
        id
    */

    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    const [likes, setLikes] = useState(props.likes);
    const [liked, setLiked] = useState(false);
    const [id, setId] = useState(props.id);
    //const [loaded, setLoaded] = useState(false);

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        try {
            const { data } = await postsApi.likesPost({ user_id: user.id, post_id: props.id });
            setLiked(data.status);
            console.log("status retrieved successfully");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    };

    /**
     * user likes the post
     */
    const addLike = async () => {
        console.log("like clicked");

        try {
            const { data } = await postsApi.incrementLike({ id: props.id, profile_id: user.id });
            setLikes(data.likes);
            setLiked(data.status);
            console.log("changed");
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

    const addComment = () => {
        console.log("add comment")
    };

    const savePost = () => {
        console.log("save post");
    };

    const editPost = () => {
        console.log("edit post");
    }

    const deletePost = async () => {
        try {
            await postsApi.deletePost({ id: id })
            console.log("deleted");
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

    const reportPost = () => {
        console.log("rep post");
    }

    const viewPost = () => {
        navigate(`/viewpost/${id}`);
    }

    return (
        <div id="post">
            <h1>{title}</h1>
            <div>{body}</div>

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
            <button className="viewPost" onClick={viewPost}>
                    view
                </button>
            </div>
        </div>
    );
}


export default Post;