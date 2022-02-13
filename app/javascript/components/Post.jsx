/**
 * Post UI
 */

import React from "react";

class Post extends React.Component {

    render() {
        return (
            <AuthProvider>
                <UserProvider>
                    <div>
                        <p>header placer</p>
                        <Routing />
                    </div>
                </UserProvider>
            </AuthProvider>
        )
    }
}


export default App;