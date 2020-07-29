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
    const[error, setError] = useState(false);

    const _history = useHistory()

    function signOutDoctor(){
        props.firebase.doSignOut()
        alert('Realize login como médico')
    }

    const onSubmit = event => {

        props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            setEmail('');
            setPassword('');

            props.firebase.auth.currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                if (!!idTokenResult.claims.doctor) {
                    console.log('IS DOC');
                    signOutDoctor()
               }else{console.log('RES');}
            })
            .catch((error) => {
              console.log(error);
            })
            props.firebase.auth.currentUser.getIdToken(false)
            .then((token) => {
                localStorage.setItem('@resUsrTkn',token)
            })
            .catch(errorMessage => 
                console.log("Auth token retrieval error: " + errorMessage)
            )
            props.history.push('/researcherImages');
        })
        .catch(error => {
            setError(true);
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