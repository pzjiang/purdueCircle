/**
 * Comment UI
 */
import React, { useEffect, useState } from "react";

import '../../styling/Comment.scss';

const Comment = props => {



    const tagUser = () => {

    };

    const deleteComment = () => {

    };

    return (
        <div>
            <p>{props.author}:</p> {props.body}
            <br></br>
            <button id="delete_comment_btn" onClick={() => props.removeMethod(props.id)}>Delete</button>
        </div>
    );
}

export default Comment;