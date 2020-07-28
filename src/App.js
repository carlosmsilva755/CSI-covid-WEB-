import React, { useState, useEffect } from "react"
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import ImageContext from './contexts/Image/index'
import { withAuthentication } from './contexts/Session'
import Router from './router'

import './styles.css'

function App(props){
    const[ImageV, setImageV] = useState('')
    const[imageResearcher, setImageResearcher] = useState('')
    const[authUser, setAuthUser] = useState(null)

    const theme = createMuiTheme({
        palette: {primary: {main: '#EE4937'}}
    });

    useEffect(() => {
        const listener = props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? setAuthUser(authUser)
                : setAuthUser(null);
        });
    
        return function cleanUp() {
            listener();
        }
    
    })

    return (
        
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ImageContext.Provider value={{ImageV, setImageV, imageResearcher, setImageResearcher}}>
                    <Router authUser={authUser}/>
                </ImageContext.Provider>
            </BrowserRouter>
        </ThemeProvider>    
    )
}

export default withAuthentication(App)