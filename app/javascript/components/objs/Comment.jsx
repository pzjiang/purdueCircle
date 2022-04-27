/**
 * Comment UI
 */
import React, { useEffect, useState } from "react";

import '../../styling/Comment.scss';

const Comment = props => {



    const tagUser = () => {

    };


    return (
        <div>
            <p>
                {props.author}: <p id="comment_text"> {props.body} &nbsp; &nbsp; </p>
                {props.ownComment && <button id="delete_comment_btn" onClick={(event) => props.removeMethod(event, props.id)}>Delete</button>} 
            </p>
            <br></br>
            <p></p>
        </div>
    );
}

export default Comment;