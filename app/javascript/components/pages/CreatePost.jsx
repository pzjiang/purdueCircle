/**
 * Page for users to create posts
 */

import React from "react";
import Layout from "../objs/Layout.jsx";
import "../../styling/CreatePost.css";


const CreatePost = () => {

    const newPost = async (event) => {

    };

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

    return (
        <Layout>
           <div className="topicSelection">Post Topics: <div id="input" contentEditable>Topic</div></div>

            <br></br>

            <div className="options">
                <button onClick={bold}>Bold</button>
                <button onClick={italisize}>Italisize</button>
                <button onClick={underscore}>Underscore</button>
                <button onClick={strikethrough}>Strikethrough</button>
                <button onClick={upload}>Upload File</button>
                <button onClick={link}>Link</button>
            </div>

            <br></br>

            <div id="textarea" contentEditable>Content</div>

            <br></br>

            <button onClick={link}>Post</button> 
        </Layout>
    );
}

export default CreatePost;