import React from "react";
import "../../styling/Home.css";

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
      returning user? sign back in!
    </h2>

    <Link to="/login">
      <button>
        sign in
      </button>
    </Link>

    <h2>
      don't have an account? get started!
    </h2>

    <Link to="/signup">
      <button>
        sign up
      </button>
    </Link>


  </div >

)
