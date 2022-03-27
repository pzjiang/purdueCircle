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
import userApi from "../../apis/apiusers";
import Layout from "./Layout.jsx";
import DiscoverUsers from "../objs/DiscoverUsers";
import userApi from "../../apis/apiusers";
import postsApi from "../../apis/apiposts";
import topicsApi from "../../apis/apitopics";


const DiscoveryPage = props => {


    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [topicsDisc, setTopicsDisc] = useState([]);
    const [search, setSearch] = useState();

    //topics for topics, posts for posts, users for users
    const [searchState, setSearchState] = useState();

    useEffect(() => {
        onLoad();
        setSearchState("topics");
    }, []);

    const onLoad = () => {

    }

    const filterUsers = (event) => {
        event.preventDefault();
        setSearchState("users");

    }


    const filterPosts = (event) => {
        event.preventDefault();
        setSearchState("posts");

    }

    const filterTopics = (event) => {
        event.preventDefault();
        setSearchState("topics");

    }

    const useSearch = () => {

        if (searchState == "users") {

        } else if (searchState == "topics") {

        } else {

        }

    }

    return (
        <div>

            <button onClick={filterTopics}> Topics Search</button>
            <button onClick={filterPosts}> Posts Search</button>
            <button onClick={filterUsers}> Users Search</button>

            <form onSubmit={useSearch}>
                <label>Search by {search}</label>
                <input type="text"></input>
                <button type="submit"> Search</button>
            </form>



        </div>
    )
}


export default DiscoveryPage;

