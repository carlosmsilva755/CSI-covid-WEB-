import React from 'react'
import {Link} from 'react-router-dom'

import logo from '../../../assets/logo.svg'
import profile from '../../../assets/Icons/profile.svg'
import { withFirebase } from '../../../contexts/Firebase';

const Header = ({ firebase }) => {

    return (
        <header>

            <div className ="container-nav">

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>


                <div className= "container-header">

                    <div className="container-header-prontuario">                   
                        <a href = '/researcherImages' className = "header-buttons">Imagens</a>                    
                    </div>

                    {/* <div className="container-header-images">  
                    <a href = '/medicalRecord' className = "header-buttons">Imagens</a>  
                    </div> */}

                </div>                
                
                <div className = "container-profile">
                    <Link to='/'>
                        <img src={profile} alt="logo" onClick={firebase.doSignOut}/>
                    </Link>
                </div>
            </div>

        </header>
    )
}
export default withFirebase(Header)