import React from 'react'

import logo from '../../../assets/logo.svg'

export default () => {
    const { width } = { width: window.innerWidth, height: window.innerHeight };

    return (
        <header>

            <div className ={width > 540 ? "container-nav" : "container-nav-responsive"}>

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>               

            </div>

        </header>
    )
}