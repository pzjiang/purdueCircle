/**
 * Comment UI
 */
import React, { useEffect, useState } from "react";

const Comment = props => {



    const tagUser = () => {

    };

    const deleteComment = () => {

    };

    return (
        <div>

            {props.body}
            <br></br>
            {props.author} {props.ownComment && <button onClick={() => props.removeMethod(props.id)}>Delete</button>}
        </div>
    );
}

export default Comment;