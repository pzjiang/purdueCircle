import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate,
    useParams
} from "react-router-dom";
import { useUserState } from "../../contexts/user";
//import authenticationApi from '../../apis/authentication';
import { useToasts } from 'react-toast-notifications';
import postsApi from "../../apis/apiposts";
//import profileApi from "../../apis/apiprofile";
//import topicsApi from "../../apis/apitopics";
//import commentsApi from "../../apis/apicomments";
import '../../styling/Post.scss';
import '../../styling/ViewPost.scss';
//import Comment from "../objs/Comment";
import Layout from "../objs/Layout";




const TimeLine = () => {


    return (
        <Layout>

        </Layout>
    )
}


export default TimeLine;