import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'

import './styles.css'
import loginImage from '../../assets/Images/loginImage.svg'
import PasswordField from '../../components/Inputs/Password/index'

export default () => {

    const[user, setUser] = useState('')
    const[password, setPassword] = useState('')

    return(

        <div className='container-login'>
            <img src={loginImage} alt="logo" className='login-image'/>
            
            <div className='inputs'>

                <TextField id="outlined-basic" 
                    label="Usuário" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields"
                    value ={user} 
                    onChange={event => setUser(event.target.value)} 
                /> 
                <br/><br/>

                <PasswordField password={password} setPassword={setPassword} classname='input-fields'/> <br/>

                <a className='text-fgtPassword' href="/">Esqueceu sua senha?</a>

                <button id='entrar-button'className='button'>Entrar</button>

            </div> <br/>

            <div className='choose-profile'>
                <p className='text'>É um médico? <a id='cadastre-medico-button'className='text-link' href="/medicalRecord">Cadastre-se aqui</a> </p>
                <p className='text-login'>É um pesquisador? <a id='cadastre-pesquisador-button' className='text-link' href="/researcherImages">Cadastre-se aqui</a> </p>
            </div>
            
        </div>
    )
}