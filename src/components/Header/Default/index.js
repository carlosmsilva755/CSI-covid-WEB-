import React from 'react'
//import {Link} from 'react-router-dom'

import logo from '../../../assets/logo.svg'
//import profile from '../../../assets/Icons/profile.svg'

export default () => {

    return (
        <header>

            <div className ="container-nav">

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>               
                
                {/* <div className = "container-profile">
                    <Link to='/'>
                        <img src={profile} alt="logo"/>
                    </Link>
                </div> */}
            </div>

        </header>
    )
}