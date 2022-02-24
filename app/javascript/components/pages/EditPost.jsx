import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
    useLocation,
    useParams
} from "react-router-dom";
import { useUserState } from "../../contexts/user";
import { useToasts } from 'react-toast-notifications';
import postsApi from "../../apis/apiposts";
import Layout from "../objs/Layout.jsx";

const EditPost = () => {
    //const [loc, setLoc] = useState(useLocation().pathname);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    //const [likes, setLikes] = useState(0);
    //const [liked, setLiked] = useState(false);
    const [id, setId] = useState(0);
    const navigate = useNavigate();
    const { index } = useParams();



    useEffect(() => {

        //let arr = loc.split('/');
        //console.log(arr[2]);
        //console.log(typeof arr[2]);
        console.log(index);
        console.log(typeof index);
        //console.log(parseInt(arr[2], 10));
        //console.log(parseInt(index, 10));

        if (isNaN(index) == true) {
            navigate("/notfound");
            return;
        }
        let thisId = parseInt(index, 10);
        setId(parseInt(index, 10));

        onLoad(thisId);
    }, []);

    const onLoad = async (thisId) => {
        try {
            const { data } = await postsApi.showPost({ id: thisId });
            setTitle(data.post.title);
            setBody(data.post.body);

            console.log("post loaded");

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <Layout>
            <form onSubmit={onSubmit}>
                <label>
                    topic:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />

                <label>
                    Content
                    <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                </label>
                <input type="submit" value="Submit" />

            </form>
        </Layout>
    )
}

export default EditPost;