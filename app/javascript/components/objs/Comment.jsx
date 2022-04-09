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
            <p>{props.author}:</p> {props.body}
            <br></br>
            {props.ownComment && <button id="delete_comment_btn" onClick={(event) => props.removeMethod(event, props.id)}>Delete</button>}

        </div>
    );
}

export default Comment;