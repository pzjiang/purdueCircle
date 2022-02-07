import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
//import NotFound from "../components/NotFound"

export default (

    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<NotFound />}></Route>
        </Routes>
    </Router>


);

