/**
 * Page for users to create posts
 */

 import React, { useState } from 'react';
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
        console.log("posted");
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("creating new post");
        console.log(inputValues.content);
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

            <div id="textarea" contentEditable></div>       

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