import React from 'react'
//import {Link} from 'react-router-dom'

import logo from '../../../assets/logo.svg'
//import profile from '../../../assets/Icons/profile.svg'

export default () => {
    const { width } = { width: window.innerWidth, height: window.innerHeight };
    
    return (
        <header>

            <div className ={width > 540 ? "container-nav" : "container-nav-responsive"}>

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>               
                
                {/* <div className = "container-profile">
                    <Link to='/login'>
                        <img src={profile} alt="logo"/>
                    </Link>
                </div> */}
            </div>

        </header>
    )
}