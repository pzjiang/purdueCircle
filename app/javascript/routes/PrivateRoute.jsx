import React from "react";
import { Navigate, Route } from "react-router-dom";
import PropTypes from "prop-types";
//import { useAuthState } from "../contexts/auth";


const PrivateRoute = props => {

    if (props.condition) {
        return (<Navigate to={props.redirectRoute} />);
    }

    {/*console.log("gets to here");*/ }
    return (props.children);

}

PrivateRoute.propTypes = {
    condition: PropTypes.bool,
    redirectRoute: PropTypes.string,
}


export default PrivateRoute;