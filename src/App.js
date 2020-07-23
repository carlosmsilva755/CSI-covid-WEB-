import React, { useState } from "react"
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import ImageContext from './contexts/index'
import Router from './router'
import './styles.css'

export default ()=>{
    //context to store image data
    const[ImageV, setImageV] = useState('')

    const theme = createMuiTheme({
        palette: {primary: {main: '#EE4937'}}
    });

    return (
        
        <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <ImageContext.Provider value={{ImageV, setImageV}}>
                        <Router/>
                    </ImageContext.Provider>
                </BrowserRouter>
            </ThemeProvider>    
    )
}