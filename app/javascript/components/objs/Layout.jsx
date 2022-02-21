/**
 * Layout for all of the pages
 * Contains components that will be same across all pages
 */

import React from "react";
import Navigation from "./Navigation";

const Layout = props => {

    return (
        <div id="layout">
            <Navigation />
            <div id="layout-children">
                {props.children}
            </div>

        </div>
    );
}


export default Layout;