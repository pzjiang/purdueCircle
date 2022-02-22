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
        console.log("creating post");
        event.preventDefault();
        try {
            await postsApi.createPost({ profile_id: user.id, post: { title: "title" ,body: inputValues.body } });
            console.log("successful post creation");
            navigate("/main");
            addToast("posted", { appearance: 'success', /*autoDismissTimeout: 1500,*/ });

        } catch (error) {
            //addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
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
           <div className="topicSelection">Post Topics: <div id="input" contentEditable></div>

            <br></br>

            <div className="options">
                <button onClick={bold}>Bold</button>
                <button onClick={italisize}>Italisize</button>
                <button onClick={underscore}>Underscore</button>
                <button onClick={strikethrough}>Strikethrough</button>
                <button onClick={link}>Link</button>
                <input type="file"/>
            </div>

            <br></br>

            <form onSubmit={newPost}>
                <label>
                    Content
                    <textarea value={inputValues.body} onChange={(e) => setInputValues({ ...inputValues, body: e.target.value })}></textarea>
                </label>
                <input type="submit" value="Submit" />

            </form>   

            </div>

            <br></br>

            <button onClick={post}>Post</button> 

            
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