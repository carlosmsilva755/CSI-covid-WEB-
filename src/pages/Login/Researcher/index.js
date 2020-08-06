import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { withRouter, useHistory } from 'react-router-dom'
import { compose } from 'recompose'
import CircularProgress from '@material-ui/core/CircularProgress';

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
    const[error, setError] = useState(false)
    const[errorMsg, setErrorMsg] = useState('')
    const[errorPassword, setErrorPas] = useState('')
    const[errorPasMsg, setErrorPasMsg] = useState('')
    const[clicked, setClicked] = useState(false)

    const _history = useHistory()

    function signOutDoctor(){
        props.firebase.doSignOut()
        alert('Realize login como médico')
    }

    const onSubmit = event => {

        setClicked(true)

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
            setErrorMessage(error)
            setClicked(false)
        })
    
        event.preventDefault();
    }

    function handleBack(){
        _history.push('/')
    }
    
    function setErrorMessage(error){
        console.log(error);
        if(email===''){
            setErrorMsg('Você deve inserir um usuário')
            setError(true);
            return
        }
        if(password === ''){
            setErrorPasMsg('Você deve inserir uma senha')
            setErrorPas(true)
            return
        }
        else{
            if(error.code === 'auth/invalid-email'){
                setErrorMsg('Email inválido')
                setError(true);
                return
            }
            if(error.code === 'auth/user-not-found'){
                setErrorMsg('Usuário não encontrado')
                setError(true);
                return
            }
            if(error.code === "auth/wrong-password"){
                setErrorPasMsg('Senha Inválida')
                setErrorPas(true)
                return
            }
        }

    }

    return(
        
        <div className='container-login'>
            <form onSubmit={onSubmit}>

                <img src={loginImage} alt="logo" className='login-image'/>
                
                <div className='inputs'>

                    <TextField error={error}
                        id="email-login-input" 
                        label={error ? errorMsg :"Usuário"} 
                        size = "small" 
                        variant="outlined"
                        className="input-fields "
                        value ={email} 
                        onChange={event => {
                            setEmail(event.target.value);
                            setError(false)
                        }} 
                    /> 
                    <br/><br/>

                    <PasswordField id='password-login'
                        error ={errorPassword}
                        setError={setErrorPas}
                        errorMessage={errorPasMsg}
                        password={password} 
                        setPassword={setPassword} 
                        classname='input-fields' 
                        label='Senha'
                    /> <br/>

                    <a id='esqueceu-senha-button' className='text-fgtPassword' href="/reset-res">Esqueceu sua senha?</a>
                    <br/>
                    <button id='entrar-button'className='button' type='submit'>
                        {clicked && !error ? 
                            <CircularProgress color='secondary' size={20} /> 
                            : 'Entrar'
                        }
                    </button>
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