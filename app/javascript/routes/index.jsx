import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router';
//import { either, isEmpty, isNil } from 'ramda';
import Home from "../components/pages/Home";
import NotFound from "../components/pages/NotFound";
import Profile from "../components/pages/Profile";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Topics from "../components/FollowTopics";
import ProfileEdit from "../components/pages/ProfileEdit";
import EditPost from "../components/pages/EditPost";
import Main from "../components/pages/Main";
import PrivateRoute from "./PrivateRoute";
import { useAuthState, useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
import CreatePost from '../components/pages/CreatePost';
import ViewPost from '../components/pages/ViewPost';
import DiscoveryPage from '../components/pages/DiscoveryPage';

//import NotFound from "../components/NotFound"

/*
export default (

    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<NotFound />}></Route>
        </Routes>
    </Router>
);
*/


const Routing = props => {

    const { authToken } = useAuthState();
    const userDispatch = useUserDispatch();
    const authDispatch = useAuthDispatch();
    const isLoggedIn = (authToken != null);
    return (
        <Router>
            <Routes>
                {isLoggedIn ? <Route exact path="/" element={<Main />} /> : <Route exact path="/" element={<Home />} />}
                {/*<Route exact path="/" element={<Home />} /> */}
                <Route exact path="/login" element={<PrivateRoute condition={isLoggedIn} redirectRoute="/" > <Login /></PrivateRoute>} />
                <Route exact path="/signup" element={<PrivateRoute condition={isLoggedIn} redirectRoute="/" > <Signup /></PrivateRoute>} />
                <Route exact path="/topics" element={<Topics />} />
                <Route exact path="/post" element={<CreatePost />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/editprofile" element={<ProfileEdit />} />
                <Route exact path="/editpost/:index" element={< EditPost />} />
                <Route exact path="/viewpost/:index" element={<ViewPost />} />
                <Route exact path="/discovery" element={<DiscoveryPage />} />
                {/*<Route exact path="/main" element={<Main />} /> */}
                <Route exact path="*" element={<NotFound />}></Route>
            </Routes>
        </Router >
    );
}


Routing.propTypes = {
    user: PropTypes.object,
};

export default Routing;