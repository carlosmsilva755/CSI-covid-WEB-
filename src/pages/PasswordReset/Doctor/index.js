import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress';

import { withFirebase } from '../../../contexts/Firebase'
import loginImage from '../../../assets/Images/loginImage.svg'

import './styles.css'


const PasswordForgetPage = () => (
    <div>
      <PasswordForgetForm />
    </div>
)

function PasswordForgetFormBase(props){
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [clicked, setClicked] = useState(false)

    const _history = useHistory()
    
    function handleBack(){
        _history.push('/login-doc')
    }

    const onSubmit = event => {

        setClicked(!clicked)

        props.firebase
          .doPasswordReset(email)
          .then(() => {
            setEmail('');
            _history.push('/reset-email');
          })
          .catch(error => {
            setError(true);
            setErrorMessage(error);
            setClicked(false)
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
                return
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
                        label={error ? errorMsg : "Email"} 
                        size = "small" 
                        variant="outlined"
                        className="input-fields"
                        value ={email} 
                        onChange={event => {setEmail(event.target.value); setError(false)}} 
                        /> 
                    <br/>

                    <button id='enviar-button'className='button' type='submit'>
                        {clicked && !error ? 
                            <CircularProgress color='secondary' size={20} /> 
                            : 'Enviar email'
                        }
                    </button>
                    <button id='voltar-button'className='button-back btn-marg' onClick={handleBack}>Voltar</button>

                </div>
            
            </form>
        </div>
    )
    

}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);