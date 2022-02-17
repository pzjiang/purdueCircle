/**
 * Layout for all of the pages
 * Contains components that will be same across all pages
 */

import React from "react";
import Navigation from "./Navigation";

const Layout = ({children}) => {

    return (
        <div id="layout">
            <Navigation />
            <div>
                this is the children for the layout
            {children}
            </div>
            
        </div>
    );
}


export default Layout;