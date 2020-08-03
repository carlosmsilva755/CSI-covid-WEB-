import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

import { withFirebase } from '../../../contexts/Firebase'
import loginImage from '../../../assets/Images/loginImage.svg'

const PasswordForgetPage = () => (
    <div>
      <PasswordForgetForm />
    </div>
)

function PasswordForgetFormBase(props){
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const _history = useHistory()
    
    function handleBack(){
        _history.push('/login-res')
    }

    const onSubmit = event => {

        props.firebase
          .doPasswordReset(email)
          .then(() => {
            setEmail('');
            _history.push('/reset-email');
          })
          .catch(error => {
            setError(true);
            setErrorMessage(error);
          });
    
        event.preventDefault();
    }

    function setErrorMessage(error){
        console.log(error);
        if(email===''){
            setErrorMsg('Você deve inserir um email')
            return
        }
        else{
            if(error.code === 'auth/invalid-email'){
                setErrorMsg('Email inválido')
                return
            }
            if(error.code === 'auth/user-not-found'){
                setErrorMsg('Usuário não encontrado')
            }
        }
    }

    return(
        <div className='container-reset'>
            <form onSubmit={onSubmit}>

                <img src={loginImage} alt="logo" className='login-image'/>
                
                <div className='inputs'>

                    <TextField error={error}
                        id="email-reset-input" 
                        label="Email" 
                        size = "small" 
                        variant="outlined"
                        className="input-fields"
                        helperText={error? errorMsg : ''}
                        value ={email} 
                        onChange={event => {setEmail(event.target.value); setError(false)}} 
                        /> 
                    <br/>

                    <button id='enviar-button'className='button' type='submit'>Enviar email</button>
                    <button id='voltar-button'className='button-back btn-marg' onClick={handleBack}>Voltar</button>

                </div>
            
            </form>
        </div>
    )
    

}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);