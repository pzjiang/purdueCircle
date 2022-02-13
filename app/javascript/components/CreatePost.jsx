/**
 * Page for users to create posts
 */

import React from "react";
import Layout from "./Layout.jsx";

 const CreatePost = () => { 

    const newPost = async (event) => {

    };
 
    return (
        <Layout>
            <div class="">Post topic</div>

            <div class="">Text</div>
            
            <div class="options">
                <p>bold</p>
                <p>italics</p>
                <p>underscore</p>
                <p>strikethrough</p>
                <p>file upload</p>
                <p>link</p>
            </div>
        </Layout>
    );
}

export default CreatePost;