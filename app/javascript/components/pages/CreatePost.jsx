/**
 * Page for users to create posts
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
import Layout from "../objs/Layout.jsx";
import "../../styling/CreatePost.scss";


const CreatePost = () => {

    const [inputValues, setInputValues] = useState({
        title: '',
        body: '',
    });
    const { addToast } = useToasts();
    const { user } = useUserState();
    const navigate = useNavigate();

    const bold = async (event) => {
        console.log("bold");

    }

    const italisize = async (event) => {
        console.log("italisize");

    }

    const underscore = async (event) => {
        console.log("underscore");
    }

    const strikethrough = async (event) => {
        console.log("strikethrough");
    }

    const upload = async (event) => {
        console.log("upload");
    }

    const link = async (event) => {
        console.log("link");
    }

    const post = async (event) => {
        console.log("posted");
    }

    /**
     * send new post to backend
     */
    const newPost = async (event) => {
        //console.log("creating post");
        event.preventDefault();
        try {
            await postsApi.createPost({ post: { title: inputValues.title, body: inputValues.body, user_id: user.id } });
            //console.log("successful post creation");
            navigate("/");
            addToast("posted", { appearance: 'success', autoDismiss: true });

        } catch (error) {
            //addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
            if (error.response) {
                console.log(error.response.data.error);
                addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }


    }

    return (
        <Layout>
            <div id="createpost">
                <h1> New Post </h1>

                <br />

                <h2> Topics </h2>

                <div className="topicSelection">

                    <center>
                        <div id="input" contentEditable></div>
                    </center>

                    <br></br>

                    <div className="options">
                        <button id="createPostBtn" onClick={bold}>Bold</button>
                        <button id="createPostBtn" onClick={italisize}>Italicize</button>
                        <button id="createPostBtn" onClick={underscore}>Underscore</button>
                        <button id="createPostBtn" onClick={strikethrough}>Strikethrough</button>
                        <button id="createPostBtn" onClick={link}>Link</button>
                        <input id="createPostBtn" type="file" />
                    </div>

                    <br></br>

                    <form id="createPostForm" onSubmit={newPost}>
                        <label>
                            Topic:
                            <input type="text" value={inputValues.title} onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })} />
                        </label>
                        <br />

                        <label>
                            Content:
                            <textarea value={inputValues.body} onChange={(e) => setInputValues({ ...inputValues, body: e.target.value })}></textarea>
                        </label>
                        <button type="submit"> Submit </button>

                    </form>

                </div>

                <br></br>

                {/*
            <button onClick={post}>Post</button>
            */}
            </div>


        </Layout>
    );
}

export default CreatePost;

/**
 * <form onSubmit={this.handleSubmit}>
                <label>
                    Content
                    <textarea value={inputValues.content} onChange={(e) => setInputValues({ ...inputValues, content: e.target.value })} />
                </label>

                <button onClick={post}>Post</button> 
            </form>
 */