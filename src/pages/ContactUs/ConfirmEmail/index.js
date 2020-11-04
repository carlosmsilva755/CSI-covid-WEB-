import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import loginImage from '../../../assets/Images/loginImage.svg'

export default ()=> {

    const _history = useHistory()
    const [name, setName]= useState('')

    useEffect(() => {
        setName(localStorage.getItem('@contactSenderName'))
    },[])
    
    function handleBack(){
        _history.push('/')
    }

    return(
        <div className='container-reset'>

                <img src={loginImage} alt="logo" className='login-image'/>
                
                <div className='inputs'>

                    <p id='verifique-text'
                        className='verify-text verify-text-title'
                    >Recebemos sua mensagem {name}</p>

                    <p id='enviado-text'className='verify-text'>
                        Obrigado por contribuir com nosso site!
                    </p>

                    <button id='voltar-button'className='button' onClick={handleBack}>Voltar</button>

                </div>
        </div>
    )
    

}
