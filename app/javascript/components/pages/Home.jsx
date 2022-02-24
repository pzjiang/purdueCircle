/**
 * Landing page for app
 * user must sign in before loading rest of information
 */

import React from "react";
import "../../styling/Home.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default () => (

  <div className="Home">
    
    <h1>
      PurdueCircle
    </h1>

    <h2>
      Welcome to PurdueCircle! <br />
      Your personal feed is just a few clicks away. <br />
    </h2>

    <Link to="/login">
      <button>
        Sign In
      </button>
    </Link>

    <h2>
      Don't have an account? Get started by signing up today.
    </h2>

    <Link to="/signup">
      <button>
        Sign Up
      </button>
    </Link>


  </div >

)
