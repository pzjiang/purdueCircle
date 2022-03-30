import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate,
    useParams
} from "react-router-dom";
import Layout from "../objs/Layout";
import { useUserState } from "../../contexts/user";
import userApi from "../../apis/apiusers";
import postsApi from "../../apis/apiposts";
import { Navigate } from 'react-router';
import Post from "../objs/Post";


const ForeignUser = () => {

    const [biol, setBiol] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [privacy, setPrivacy] = useState(false);
    const [id, setId] = useState(0);

    const [posts, setPosts] = useState([]);
    const [followed, setFollowed] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    //display can either be "posts", "followers", or "following"
    const [display, setDisplay] = useState("posts");
    const navigate = useNavigate();

    const { index } = useParams();
    const { user } = useUserState();



    useEffect(() => {
        //redirect back to normal profile page if this is their on profile
        if (user.username == index) {
            navigate('/profile');
            return;
        }
        setDisplay("posts");
        onLoad(index);
    }, []);


    const onLoad = async (index) => {
        //load basic user information and profile
        let thisId = 0;
        try {
            const { data } = await userApi.findUser({ name: index });
            setBiol(data.profile.bio);
            setFirstName(data.user.first_name);
            setLastName(data.user.last_name);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setPrivacy(data.user.privacy);
            setId(data.user.id);
            thisId = data.user.id;

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Unidentified error", error.message);
            }
            //navigate('/notfound');
            return;
        }
        //load the posts that belong to them.
        try {
            const { data } = await postsApi.ownPosts({ user_id: thisId, number: 10 });
            setPosts(data.posts);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Unidentified error", error.message);
            }
        }

        //initialize the followed status
        try {
            const { data } = await userApi.isFollowing({ id: user.id, target_id: thisId });
            setFollowed(data.status);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Unidentified error", error.message);
            }
        }
    }

    //allows user to follow this user
    const followUser = async (event) => {
        event.preventDefault();
        try {
            const { data } = await userApi.followUser({ id: user.id, target_id: id });
            setFollowed(true);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Unidentified error", error.message);
            }
        }
    }

    const unfollowUser = async (event) => {
        event.preventDefault();
        try {
            const { data } = await userApi.unfollowUser({ id: user.id, target_id: id });
            setFollowed(false);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Unidentified error", error.message);
            }
        }
    }


    const displayPosts = async (event) => {
        event.preventDefault();
        setDisplay("posts");
    }

    const displayFollowers = async (event) => {
        event.preventDefault();
        setDisplay("followers");
    }

    const displayFollowing = async (event) => {
        event.preventDefault();
        setDisplay("following");
    }

    return (
        <Layout>
            <div id="profile">

                <h1> {first_name}'s Profile </h1>

                <br />

                <div className="child">
                    <span className="dot"></span>
                </div>
                <div className="child">
                    <div id="name">
                        <h2> {first_name} {last_name} </h2>
                        <h2> @{username}</h2>
                    </div>
                </div>

                <br />
                <br />
                <h3></h3>
                <h3>Bio</h3>
                <p> {biol}</p>
                <h3>Email</h3>
                {privacy &&
                    <p> [ FILTERED ] </p>}
                {privacy == false &&
                    <p>{email}</p>}
                <h3>Topics</h3>
                <p> -- </p>
                {followed == false && <button onClick={followUser}> Follow User</button>}
                {followed && <button onClick={unfollowUser}>Unfollow User</button>}
            </div>
            <button> Display Posts</button>
            <button>Display Following</button>
            <button> Display Followers</button>



            {display == "posts" &&
                < div className="postList">
                    {posts.reverse().map((post) => (
                        <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                    ))}
                </div>
            }

            {display == "following" &&

                <div>following display</div>
            }

            {display == "followers" &&
                <div>followers display</div>
            }


        </Layout >
    )
}

export default ForeignUser;