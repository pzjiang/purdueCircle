/**
 * Page for users to create posts
 */
 import Trix from "trix";
import React, { useEffect, useState } from "react";
import { ReactTrixRTEInput } from "react-trix-rte";

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
    var content = "";
    const [topics, setTopics] = useState([]);
    const [curTopic, setCurTopic] = useState("");
    const { addToast } = useToasts();
    const { user } = useUserState();
    const navigate = useNavigate();
    const [value, setValue] = useState("");

    /*not needed function
    const post = async (event) => {
        console.log("posted");
    }
    */

    //add topic to the list
    const topicSubmit = (event) => {
        event.preventDefault();
        if (curTopic == "") {
            return;
        }
        topics.forEach((topic) => {
            if (topic == curTopic) {
                return;
            }
        });
        setTopics([...topics, { name: curTopic, id: curTopic }]);
        setCurTopic("");
    }

    const removeTopic = (param) => {

        //console.log(param);
        const newList = topics.filter((item) => item.id !== param);
        setTopics(newList);

    }

    function handleChange(event, newValue) {
        setValue(newValue); // OR custom on change listener.
        content = newValue;
        console.log("newValue is now: " + content);
      }

    /**
     * send new post to backend
     */
    const newPost = async (event) => {
        console.log("creating post " + content );
        event.preventDefault();

        //create string list of topics to pass into api request
        const topicList = [];
        topics.forEach((topic) => {
            topicList.push(topic.name);
        });

        try {
            await postsApi.createPost({ post: { title: inputValues.title, body: content, user_id: user.id }, topics: topicList });
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
                        <form id="topicinput" onSubmit={topicSubmit}>
                            <input type="text" value={curTopic} onChange={(e) => setCurTopic(e.target.value)} />
                            <br></br>
                            <button type="submit"> Submit </button>
                        </form>
                    </center>

                    <br></br>
                    {topics.map((topic) => (
                        <div>
                            <button onClick={() => removeTopic(topic.id)}> {topic.name}</button>
                            <br></br>
                        </div>
                    ))}
                    <br></br>


                    <form id="createPostForm" onSubmit={newPost}>
                        <label>
                            Title:
                            <input type="text" value={inputValues.title} onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })} />
                        </label>
                        <br />

                        <label>
                            Content:
                            <ReactTrixRTEInput defaultValue="<div>Content</div>" onChange={handleChange} />
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