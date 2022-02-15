import React from "react";
import Routing from "../routes/index";

import { AuthProvider } from '../contexts/auth';
import { UserProvider } from '../contexts/user';
import { ToastProvider } from 'react-toast-notifications';

/*
const App = () => {
    return (
        <>{Routing}</>
    );
}

export default App;
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }




    render() {
        return (
            <AuthProvider>
                <UserProvider>
                    <ToastProvider>
                        <div>
                            <Routing />
                        </div>
                    </ToastProvider>
                </UserProvider>
            </AuthProvider>
        )
    }
}


export default App;
/*
export default () => (

    <div>
        <p>header placer</p>
        <> {Routing} </>
    </div>

)
*/

