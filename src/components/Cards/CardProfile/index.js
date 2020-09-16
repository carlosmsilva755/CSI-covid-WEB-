import React from 'react'
// import { useHistory } from 'react-router-dom'

import options from "../../../assets/Icons/options.svg"
import './styles.css'
 
export default ({profile})=>{

    return(
        <div id='profile-card-admin'>
            <div className='profile-card-header'>
                <div className='profile-card-header-text'>
                    {profile.CRM ? <p>Médico</p> : <p>Pesquisador</p>}
                    <p className='header-profile-text-small'>{profile.specialty}</p>
                </div>
                <div className='profile-card-header-options'>
                    <img src={options} alt=""/>
                </div>
            </div>

            <p className='profile-card-header-name'>{profile.name}</p>
            <p className='profile-card-header-email'>{profile.email}</p>
            {profile.CRM ? 
                <p className='profile-card-header-email'>{profile.CRM}</p> 
                :  <p className='profile-card-header-email'>{profile.institution}</p>}

        </div>
    )
}