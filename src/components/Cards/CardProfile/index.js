import React from 'react'
// import { useHistory } from 'react-router-dom'

import options from "../../../assets/Icons/options.svg"
import './styles.css'
 
export default ({profile})=>{

    return(
        <div id='profile-card-admin'>
            <div className='profile-card-header'>
                <div className='profile-card-header-text'>
                    <p>Médico</p>
                    <p className='header-profile-text-small'>Especialidade</p>
                </div>
                <div className='profile-card-header-options'>
                    <img src={options} alt=""/>
                </div>
            </div>

            <p className='profile-card-header-name'>Carlos Magalhes silva</p>
            <p className='profile-card-header-email'>email@gmail.com</p>
            <p className='profile-card-header-email'>465321</p>

        </div>
    )
}