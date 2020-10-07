import React from 'react'
import { useHistory } from 'react-router-dom'

import loginImage from '../../../assets/Images/loginImage.svg'

export default ()=> {

    const _history = useHistory()
    
    function handleBack(){
        _history.push('/login')
    }

    return(
        <div className='container-reset'>

                <img src={loginImage} alt="logo" className='login-image'/>
                
                <div className='inputs'>

                    <p id='verifique-text'className='verify-text verify-text-title'>Verifique seu email!</p>
                    <p id='enviado-text'className='verify-text'>
                        Foi enviado um email para você com
                        um link para redefinir sua senha!
                    </p>

                    <button id='voltar-button'className='button' onClick={handleBack}>Voltar</button>

                </div>
        </div>
    )
    

}
