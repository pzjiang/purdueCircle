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
import { useToasts } from 'react-toast-notifications';
import postsApi from "../../apis/apiposts";
import profileApi from "../../apis/apiprofile";
import topicsApi from "../../apis/apitopics";
import commentsApi from "../../apis/apicomments";
import '../../styling/Post.scss';
import '../../styling/ViewPost.scss';
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
    const [topics, setTopics] = useState([]);
    const [updated, setUpdated] = useState();
    const [privacy, setPrivacy] = useState(false);
    const [authorUser, setAuthorUser] = useState();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();


    const { user } = useUserState();
    const navigate = useNavigate();
    const { addToast } = useToasts();

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
        let holdid = -1;
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
            //TODO
            //parse updated so it is more human readable.
            setUpdated(data.post.updated_at);
            setPrivacy(data.post.privacy);
            setAuthorUser(data.author);
            holdid = data.post.id;
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
        //get topics
        try {
            if (holdid == -1) {
                return;
            }
            const { data } = await topicsApi.pullTopics({ post_id: holdid });
            //console.log(data.topics);
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

        //get comments
        try {
            if (holdid == -1) {
                return;
            }
            const { data } = await commentsApi.showComments({ post_id: holdid });
            setComments(data.comments);


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

    /*
     * user who owns the post changes the privacy setting
    */

    const changePrivacy = async () => {
        try {
            const { data } = await postsApi.changePrivacy({ id: id });
            setPrivacy(data.privacy);
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

    /**
     * user likes the post
     */
    const addLike = async (event) => {
        //console.log("like clicked");
        event.preventDefault();
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

    const addComment = async (event) => {
        event.preventDefault();

        try {
            const { data } = await commentsApi.addComment({ user_id: user.id, body: newComment, post_id: id });
            setComments([...comments, data.comment]);
            setNewComment("");
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
            addToast("Post successfully deleted!", { appearance: 'success', autoDismiss: true, });
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

    const removeComment = async (comment_id) => {
        try {
            await commentsApi.deleteComment({ id: comment_id });
            const newList = comments.filter((item) => item.id !== comment_id);
            setComments(newList);

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



    return (
        <Layout>
            <div className="expandedPost">
            <h1>{title}</h1>
            <br></br>
            <br></br>

                {
                    userId == user.id &&
                    <div className="options">
                        <button id="small_post_btn" className="edit" onClick={editPost}>Edit Post</button>
                        <button id="small_post_btn" className="delete" onClick={deletePost}>Delete Post</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <button id="small_post_btn" className="changePrivacy" onClick={changePrivacy}>Change Privacy</button>
                        current privacy: {privacy && <p>private</p>} {privacy == false && <p>public</p>}
                    </div>
                }

            
                <div>{body}</div>


                <p>Topics</p>

                {topics.map((topic) => (
                    <div>{topic} </div>

                ))}

                <br></br>
                <p>Last updated: {updated}</p>


                {privacy &&
                    <p>Redacted</p>
                }
                {privacy == false &&
                    <p>
                        {authorUser}
                    </p>
                }


                {comments.map((comment) => (
                    <Comment author={comment.author} body={comment.body} id={comment.id} removeMethod={removeComment}></Comment>
                ))}
                <br></br>
                <div className="reactions">
                    <button className="like" onClick={addLike}>
                        <i className="fa fa-heart" aria-hidden="true"></i> {likes}
                    </button>
                </div>

                <p></p>

                {/*
                    add in an input field to create comments
                */
                }
                <form onSubmit={addComment}>
                    <textarea value={newComment} placeholder="newComment" onChange={(e) => setNewComment(e.target.value)}></textarea>
                    <button value="submit">New Comment</button>

                </form>

            </div>
        </Layout>
    );
}


export default ViewPost;