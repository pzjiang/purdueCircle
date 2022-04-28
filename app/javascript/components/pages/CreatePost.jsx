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
    const [topics, setTopics] = useState([]);
    const [curTopic, setCurTopic] = useState("");
    const [image, setImage] = useState();
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
        if (topics.length > 3) {
            return;
        }
        topics.forEach((topic) => {
            if (topic.name == curTopic) {
                return;
            }
        });
        setTopics([...topics, { name: curTopic, id: curTopic }]);
        setCurTopic("");
    }
    /*
    const removeTopic = (param) => {

        //console.log(param);
        const newList = topics.filter((item) => item.id !== param);
        setTopics(newList);

    }
    */

    /**
     * send new post to backend
     */
    const newPost = async (event) => {
        //console.log("creating post");
        event.preventDefault();

        //create string list of topics to pass into api request
        /*const topicList = [];
        topics.forEach((topic) => {
            topicList.push(topic.name);
        });
        */
        let tagged_users = [];

        let tempuser = "";
        let tagged = false;
        for (let i = 0; i < inputValues.body.length; i++) {
            if (tagged == false && inputValues.body[i] == '@') {
                tempuser = "";
                tagged = true;
            }
            else if (inputValues.body[i] == '@') {
                if (tempuser == "") {
                    continue;
                }
                tagged_users.push(tempuser);
                tempuser = "";
            }
            else if (tagged == true && inputValues.body[i] == ' ') {
                tagged = false;
                tagged_users.push(tempuser);
                tempuser = "";
            }
            else if (tagged == true) {
                tempuser += inputValues.body[i];
            }
        }
        if (tempuser != "" && tagged == true) {
            tagged_users.push(tempuser);
        }

        tagged_users = [...new Set(tagged_users)];

        if (image == null) {

            try {
                await postsApi.createPost({ post: { title: inputValues.title, body: inputValues.body, user_id: user.id }, topics: curTopic, picture: false, tagged_users: tagged_users });
                //console.log("successful post creation");
                navigate("/");
                addToast("posted", { appearance: 'success', autoDismiss: true });

            } catch (error) {
                //addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
                if (error.response) {
                    console.log(error.response.data.error);
                    addToast(error.response.data.error, { appearance: 'error', autoDismiss: true,/*autoDismissTimeout: 1500,*/ });
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("error", error.message);
                }
            }
        }
        else if (image != null) {
            try {
                let sentData = new FormData();
                //let post = { title: inputValues.title, body: inputValues.body, user_id: user.id };
                sentData.append('title', inputValues.title);
                sentData.append('body', inputValues.body);
                sentData.append('user_id', user.id);
                sentData.append('topics', curTopic);
                sentData.append('picture', true);
                sentData.append('image', image);
                //sentData.append('tagged_users', tagged_users);


                await postsApi.createPostPicture(sentData);
                //console.log("successful post creation");
                navigate("/");
                addToast("posted", { appearance: 'success', autoDismiss: true });

            } catch (error) {
                //addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
                if (error.response) {
                    console.log(error.response.data.error);
                    addToast(error.response.data.error, { appearance: 'error', autoDismiss: true,/*autoDismissTimeout: 1500,*/ });
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("error", error.message);
                }
            }
        }

    };

    return (
        <Layout>
            <div id="createpost">
                <h1> New Post </h1>

                <br />

                <h2> Topics </h2>

                <div className="topicSelection">

                    <center>
                        <form id="topicinput">
                            <input type="text" value={curTopic} onChange={(e) => setCurTopic(e.target.value)} />

                            {/*<button type="submit"> Submit </button>*/}
                        </form>
                    </center>

                    <br></br>

                    {/*topics.map((topic) => (
                        <div>
                            <button onClick={() => removeTopic(topic.id)}> {topic.name}</button>
                            <br></br>
                        </div>
                    )) */}

                    <br></br>

                    <div className="options">
                        <button id="createPostBtn" onClick={bold}>Bold</button>
                        <button id="createPostBtn" onClick={italisize}>Italicize</button>
                        <button id="createPostBtn" onClick={underscore}>Underscore</button>
                        <button id="createPostBtn" onClick={strikethrough}>Strikethrough</button>
                        <button id="createPostBtn" onClick={link}>Link</button>
                        <input type="file" accept="image/*" multiple={false} onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <br></br>

                    <form id="createPostForm" onSubmit={newPost}>
                        <label>
                            Title:
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