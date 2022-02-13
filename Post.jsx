/**
 * Post UI
 */

import React from "react";

const Post = () => { 

    return (
        <div className="post-body">
            <h1 className="post-title">Post Title</h1>
            <h3 className="post-tags">Tags</h3>

            <p className="post-paragraph">Post </p>

            <button className="like-post">Like</button>
            <button className="emoticon-1-post">Like</button>
            <button className="emoticon-2-post">Like</button>
            <button className="emoticon-3-post">Like</button>

            <a href="#" className="comment-item">
                <p className="comment-item-text">Comment Text.</p>
                <button className="reply-button">Reply</button>
            </a> 

            <a href="#" className="comment-item">
                <p className="comment-item-text">Comment Text.</p>
                <button className="reply-button">Reply</button>
            </a> 

            <a href="#" className="comment-item">
                <p className="comment-item-text">Comment Text.</p>
                <button className="reply-button">Reply</button>
            </a> 

            <form className="comment-box">Comment Here</form>
            <button className="comment-post">Post</button>
        </div>
    );
}


export default Post;