import React from "react";
import "../styling/Home";
import "../components/FollowTopics";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default () => (

    <div>
        This is the home page
        <br></br>

        <button className="testbutton">Test button </button>

        <br></br>
        <Link to="/randompage">not found </Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Sign up</Link>
        <br />
        <Link to="/topics">Follow Topics</Link>
    </div >

)