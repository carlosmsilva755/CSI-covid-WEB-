import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { withRouter, useHistory } from 'react-router-dom'
import { compose } from 'recompose'

import loginImage from '../../../assets/Images/loginImage.svg'
import PasswordField from '../../../components/Inputs/Password/index'
import { withFirebase } from '../../../contexts/Firebase'
import './styles.css'

const SignInPage = () => (
    <div id="sign-in-page">
      <SignInForm />
    </div>
)

function SignInFormBase(props){

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState(null);

    const _history = useHistory()

    const onSubmit = event => {

        props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            setEmail('');
            setPassword('');
            setError(null);
            props.history.push('/researcherImages');
        })
        .catch(error => {
            setError(error);
        })
    
        event.preventDefault();
    }

    function handleBack(){
        _history.push('/')
    }

    return(
        
        <div className='container-login'>
            <form onSubmit={onSubmit}>

                <img src={loginImage} alt="logo" className='login-image'/>
                
                <div className='inputs'>

                    <TextField error={error}
                        id="email-login-input" 
                        label="Usuário" 
                        size = "small" 
                        variant="outlined"
                        className="input-fields"
                        value ={email} 
                        onChange={event => setEmail(event.target.value)} 
                        /> 
                    <br/><br/>

                    <PasswordField password={password} setPassword={setPassword} classname='input-fields' label='Senha'/> <br/>

                    <a className='text-fgtPassword' href="/">Esqueceu sua senha?</a>

                    <button id='entrar-button'className='button' type='submit'>Entrar</button>
                    <button id='voltar-button'className='button-back btn-marg' onClick={handleBack}>Voltar</button>

                </div>
            
            </form>
        </div>
    )
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);
  
export default SignInPage;
  
export { SignInForm };