import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
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
                <Route exact path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}


Routing.propTypes = {
    user: PropTypes.object,
};

export default Routing;