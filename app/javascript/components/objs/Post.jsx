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
import topicsApi from "../../apis/apitopics";
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
    const [topics, setTopics] = useState([]);
    const [authorUser, setAuthorUser] = useState();
    const [saved, setSaved] = useState();
    const [id, setId] = useState(0);
    const [privacy, setPrivacy] = useState(false);

    //const [loaded, setLoaded] = useState(false);

    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        // get author
        try {
            const { data } = await postsApi.showPost({ id: props.id });
            setAuthorUser(data.author);
            setPrivacy(data.post.privacy);
            setId(props.id);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }

        // pull likes
        try {
            const { data } = await postsApi.likesPost({ user_id: user.id, post_id: props.id });
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

        // get topics
        try {
            const { data } = await topicsApi.pullTopics({ post_id: props.id });
            console.log(data.topics);
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

        // load saved
        try {
            console.log(props.id);
            console.log(user.id);
            const  { data } = await postsApi.checkSave({ post_id: props.id, id: user.id });

            if (data.saved == true) {
                setSaved("Unsave");
                console.log("undefined");
            } else {
                setSaved("Save");
                console.log("saved")
            }

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
            const { data } = await postsApi.incrementLike({ id: props.id, user_id: user.id });
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


    const savePost = async(event) => {
        try {
            const { data } = await postsApi.changeSave({ post_id: id, id: user.id })
            if (data.destroyed == true) {
                addToast("Post Unsaved!", { appearance: 'success', autoDismiss: true, });
                setSaved("Save");
            } else {
                addToast("Post Saved!", { appearance: 'success', autoDismiss: true, });
                setSaved("Unsave");
            }
        } catch (error) {
            addToast("Error Saving Post.", { appearance: 'error', autoDismiss: true, });

            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
        console.log("save post");
    };

    /*
    const editPost = () => {
        navigate(`/editpost/${id}`);
    }
    */


    /*
    const deletePost = async () => {
        try {
            await postsApi.deletePost({ id: id })
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
    */

    /*
    const reportPost = () => {
        console.log("rep post");
    }
    */

    const viewPost = () => {
        navigate(`/viewpost/${id}`);
    }

    return (
        <div id="post">
            <h1>{title}</h1>
            
            {privacy == false &&
                <h3>Posted by: <Link to={'/profile/' + authorUser}>{authorUser}</Link></h3>
            }

            <h3>Topics:</h3>
            {topics.map((topic) => (
                <div><p>{topic} </p></div>
            ))}
            
            <div>{body}</div>

            <p></p>
            <div className="reactions">
                <button id="small_post_btn" className="like" onClick={addLike}>
                    <i className="fa fa-heart" aria-hidden="true"></i> {likes}
                </button>
                <button id="small_post_btn" className="comment" onClick={viewPost}>
                    <i className="fa fa-comment" aria-hidden="true"></i> Comment
                </button>
                <button id="small_post_btn" className="editButton" onClick={savePost}>{saved}
                </button>
                <button id="small_post_btn" className="viewPost" onClick={viewPost}>
                    View
                </button>
            </div>
            {/*
            <div className="options">
            </div>
            */}
        </div>
    );
}


export default Post;