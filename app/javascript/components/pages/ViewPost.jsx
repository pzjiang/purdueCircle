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
 import '../../styling/Post.scss';
 import Comment from "../objs/Comment";
 import Layout from "../objs/Layout";
 
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
     const [id, setId] = useState(0);
     const { index } = useParams();
 
     const { user } = useUserState();
     const navigate = useNavigate();
     const { addToast } = useToasts();
     const authDispatch = useAuthDispatch();
 
    useEffect(() => {
        console.log(index);
        console.log(typeof index);

        if (isNaN(index) == true) {
            navigate("/notfound");
            return;
        }
        let thisId = parseInt(index, 10);
        setId(parseInt(index, 10));

        onLoad(thisId);
    }, []);
 
    const onLoad = async (thisId) => {
        try {
            const { data } = await postsApi.showPost({ id: thisId });
            setTitle(data.post.title);
            setBody(data.post.body);
            setLikes(data.post.likes);

            console.log("post loaded");

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

     const isPostOwner = () => {
         console.log("check post owner");
         return true;
     }
 
     return (
         <Layout>
            <div class="expandedPost">
                { isPostOwner &&
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
 
 
 export default Post;