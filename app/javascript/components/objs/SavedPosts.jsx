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



const SavedPosts = props => {
    const [id] = useState(0);
    const [posts, setPosts] = useState([{ title: "title", body: "test body", id: 1 }]);
    const [numberLoaded, setNumberLoaded] = useState(4);


    return (
        <div>
            Saved posts
        </div>
    );


};


export default SavedPosts;
