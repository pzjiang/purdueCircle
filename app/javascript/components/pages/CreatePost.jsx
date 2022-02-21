/**
 * Page for users to create posts
 */

import React from "react";
import Layout from "../objs/Layout.jsx";
import "../../styling/CreatePost.scss";


const CreatePost = () => {

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
        console.log("link");
    }

    return (
        <Layout>
           <div className="topicSelection">Post Topics: <div id="input" contentEditable>Topic</div>

            <br></br>

            <div className="options">
                <button onClick={bold}>Bold</button>
                <button onClick={italisize}>Italisize</button>
                <button onClick={underscore}>Underscore</button>
                <button onClick={strikethrough}>Strikethrough</button>
                <button onClick={link}>Link</button>
                <input type="file"/>

                
                <div id="textarea" contentEditable>Content</div>
            </div>

            <br></br>

            </div>

            <br></br>

            <button onClick={post}>Post</button> 
        </Layout>
    );
}

export default CreatePost;