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
import { useToasts } from 'react-toast-notifications';
import DiscoverUsers from "../objs/DiscoverUsers";
import userApi from "../../apis/apiusers";
import postsApi from "../../apis/apiposts";
import topicsApi from "../../apis/apitopics";
import DiscoverTopics from "../objs/DiscoverTopics";
import Post from "../objs/Post";
import Layout from "../objs/Layout";


const DiscoveryPage = props => {


    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [topicsDisc, setTopicsDisc] = useState([]);
    const [search, setSearch] = useState("");
    const [searchNumber, setSearchNumber] = useState();
    const { addToast } = useToasts();


    //topics for topics, posts for posts, users for users
    const [searchState, setSearchState] = useState();

    useEffect(() => {
        onLoad();
        setSearchState("topics");

        setSearchNumber(10);
    }, []);

    const onLoad = () => {

    }

    const filterUsers = (event) => {
        event.preventDefault();
        setSearchState("users");
        setSearch("");
        setUsers([]);
        addToast("Changed to searching users", { appearance: 'success', autoDismiss: true });

    }


    const filterPosts = (event) => {
        event.preventDefault();
        setSearchState("posts");
        setSearch("");
        setPosts([]);
        addToast("Changed to searching post titles", { appearance: 'success', autoDismiss: true });

    }

    const filterTopics = (event) => {
        event.preventDefault();
        setSearchState("topics");
        setSearch("");
        setTopicsDisc([]);
        addToast("Changed to searching topic names", { appearance: 'success', autoDismiss: true });
    }

    const useSearch = async (event) => {
        event.preventDefault();
        if (search == "") {
            setUsers([]);
            setTopicsDisc([]);
            setPosts([]);
            return;
        }
        if (searchState == "users") {
            try {
                const { data } = await userApi.discoverUsers({ name: search, number: searchNumber });
                setUsers(data.users);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.error);
                    addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("error", error.message);
                }
            }

        } else if (searchState == "topics") {
            try {
                const { data } = await topicsApi.discoverTopics({ name: search, number: searchNumber });
                setTopicsDisc(data.topics);
                //console.log(data.topics);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.error);
                    addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("error", error.message);
                }
            }
        } else {
            try {
                const { data } = await postsApi.discoverPosts({ name: search, number: searchNumber });
                setPosts(data.posts);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.error);
                    addToast(error.response.data.error, { appearance: 'error', /*autoDismissTimeout: 1500,*/ });
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("error", error.message);
                }
            }
        }

    }

    return (
        <Layout>

            <button onClick={filterTopics}> Topics Search</button>
            <button onClick={filterPosts}> Posts Search</button>
            <button onClick={filterUsers}> Users Search</button>

            <form onSubmit={useSearch}>
                <label>Search by {searchState}</label>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <button type="submit"> Search</button>
            </form>

            <br></br>
            <br></br>
            {searchState == "users" &&
                users.map((user) => (
                    user.privacy == false &&
                    <DiscoverUsers firstname={user.first_name} lastname={user.last_name} username={user.username}> </DiscoverUsers>

                ))
            }

            {searchState == "topics" &&
                topicsDisc.map((topic) => (
                    <DiscoverTopics name={topic.name}> </DiscoverTopics>
                ))
            }

            {searchState == "posts" &&
                posts.reverse().map((post) => (
                    <Post title={post.title} body={post.body} likes={post.likes} liked={false} id={post.id} key={post.id} />
                ))

            }


        </Layout>
    )
}


export default DiscoveryPage;

