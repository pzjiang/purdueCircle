/**
 * Navigation bar
 */

 import React, { useState } from 'react';
 import { Link } from 'react-router-dom';

const Navigation = () => {

    return (
        <div>
            this is the navigation bar
            <Link to='../pages/main'> home</Link>
            <Link to='../pages/createPost'> New Post</Link>
            <Link to='../pages/profile'> Profile</Link>
        </div>
    );
}


export default Navigation;