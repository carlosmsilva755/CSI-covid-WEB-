import React, { useState } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    function WithAuthentication(props) {

        const [authUser, setAuthUser] = useState(null);
        useState(() => {
            const listener = props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? setAuthUser(authUser)
                        : setAuthUser(null);
                },
            );
            return function cleanUp() {
                listener();
            }
        }, [])

        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        );
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;