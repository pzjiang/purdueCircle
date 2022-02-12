import React from "react";
import { Navigate, Route } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({
    component: Component,
    condition,
    path,
    redirectRoute,
    ...props
}) => {
    if (!condition) {
        return (
            <Navigate
                to={{
                    pathname: redirectRoute,
                    from: props.location,
                }}
            />
        );
    }
    return <Route path={path} component={Component} {...props} />;
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
    condition: PropTypes.bool,
    path: PropTypes.string,
    redirectRoute: PropTypes.string,
    location: PropTypes.object,
};

export default PrivateRoute;