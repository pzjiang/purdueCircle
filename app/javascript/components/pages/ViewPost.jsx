/**
 * Post UI
 */

import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate,
    useParams
} from "react-router-dom";
import { useUserState } from "../../contexts/user";
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from "../../contexts/auth";
import { resetAuthTokens } from "../../apis/axios";
import { useToasts } from 'react-toast-notifications';
import postsApi from "../../apis/apiposts";
import profileApi from "../../apis/apiprofile";
import '../../styling/Post.scss';
import Comment from "../objs/Comment";
import Layout from "../objs/Layout";

const ViewPost = () => {

    /*
        title
        body
        likes
        profile_id (which profile it belongs to)
        id
    */

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [likes, setLikes] = useState();
    const [liked, setLiked] = useState(false);
    const [userId, setUserId] = useState();
    const [id, setId] = useState(0);
    //const [profileId, setProfileId] = useState();
    const { index } = useParams();

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();

    useEffect(() => {


        if (isNaN(index) == true) {
            navigate("/notfound");
            return;
        }
        let thisId = parseInt(index, 10);
        setId(parseInt(index, 10));

        onLoad(thisId);
        //isPostOwner(profileId);


    }, []);

    const onLoad = async (thisId) => {
        try {
            const { data } = await postsApi.likesPost({ user_id: user.id, post_id: thisId });
            setLiked(data.status);
            //console.log("status retrieved successfully");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
        try {
            const { data } = await postsApi.showPost({ id: thisId });
            setTitle(data.post.title);
            setBody(data.post.body);
            setLikes(data.post.likes);
            setUserId(data.post.user_id);
            //setProfileId(data.post.profile_id);
            //return data.post.profile_id;
            /*
            const {
                profiles
            } = await profileApi.getprofile({ user_id: user.id });

            console.log(profiles);
            let temp = profiles.profile.id;
            //console.log(temp);
            //console.log(profileId);
            if (temp == data.post.profile_id) {
                setIsPostOwner(true);
            }
            setIsPostOwner(false);
            */
            //setIsPostOwner(true);

            //console.log("post loaded");

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
            const { data } = await postsApi.incrementLike({ id: id, profile_id: user.id });
            setLikes(data.likes);
            setLiked(data.status);
            //console.log("changed");
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
        navigate(`/editpost/${id}`);
    }

    const deletePost = async () => {
        try {
            await postsApi.deletePost({ id: id })
            navigate(`/profile`);
            //console.log("deleted");
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

    /*
    const isPostOwner = async () => {
        console.log("check post owner");
        let temp;
        let thisId = parseInt(index);
        try {
            const { data } = await postsApi.showPost({ id: thisId });
            temp = data.post.profile_id;
        } catch (error) {
            console.log(error);
        }
        const { data } = await postsApi.showPost({ id: thisId });

        try {
            const { profile } = await profileApi.getprofile({ user_id: user.id });
            let profileId = profile.id;
            console.log(temp);

            if (temp == profileId) {

                return true;
            }
            return false;
        } catch (error) {

            return false;
        }

    }
    */



    return (
        <Layout>
            <div className="expandedPost">
                {
                    userId == user.id &&
                    <div className="options">
                        <button className="edit" onClick={editPost}>edit post</button>
                        <button className="delete" onClick={deletePost}>delete post</button>
                    </div>
                }

                <h1>{title}</h1>
                <div>{body}</div>

                <p></p>
                <div className="reactions">
                    <button className="like" onClick={addLike}>
                        <i className="fa fa-heart" aria-hidden="true"></i> {likes}
                    </button>
                </div>

                <p></p>

                {/*
                <table class="comments">
                    <tr><td><input type="addComment"></input></td></tr>
                    <tr><td><Comment>hello this will be a comment</Comment></td></tr>
                </table>*/
                }
            </div>
        </Layout>
    );
}


export default ViewPost;