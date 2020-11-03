import React from 'react'
import { useHistory } from 'react-router-dom'

import logo from '../../../assets/logo.svg'
import './styles.css'

export default () => {
    const { width } = { width: window.innerWidth, height: window.innerHeight };
    const history = useHistory()

    const handleContact = () => {
        history.push('/contact')
    }
    return (
        <header>

            <div className ={width > 540 ? "container-nav" : "container-nav-responsive"}>

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>               

                <div className='landing-header-text'>
                    <p className='hdr-text' onClick={handleContact}>Contato</p>
                </div>
            </div>

        </header>
    )
}