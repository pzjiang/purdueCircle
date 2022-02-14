import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import NotFound from "../components/pages/NotFound";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Topics from "../components/FollowTopics";
import Main from "../components/pages/Main";
import PrivateRoute from "./PrivateRoute";
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



    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/topics" element={<Topics />} />
                <Route exact path="/main" element={<Main />} />
                <Route exact path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}


Routing.propTypes = {
    user: PropTypes.object,
};

export default Routing;