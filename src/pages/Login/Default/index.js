import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { compose } from 'recompose'
// import Recaptcha from 'react-recaptcha'

import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress';

import loginImage from '../../../assets/Images/loginImage.svg'
import PasswordField from '../../../components/Inputs/Password/index'
import { withFirebase } from '../../../contexts/Firebase'
import { AuthUserContext } from '../../../contexts/Session'
import './styles.css'

const SignInPage = () => (
    <div id="sign-in-page">
      <SignInForm />
    </div>
)

function SignInFormBase(props){

    useEffect(() => {
        localStorage.removeItem('@currentpage')
        localStorage.removeItem('@currentpageFilter')
        localStorage.removeItem('@filterNumber')
        localStorage.removeItem('@currentpageFilterRes')
        localStorage.removeItem('@filterNumberRes')
        localStorage.removeItem('@currentpageFilterUp')
        localStorage.removeItem('@filterNumberUp')

    }, [])
    
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState(false);
    const[errorMsg, setErrorMsg] = useState('')
    const[errorPassword, setErrorPas] = useState('')
    const[errorPasMsg, setErrorPasMsg] = useState('')
    const[clicked, setClicked] = useState(false)

    const[loginError, setLoginError] = useState(false)
    // const[isVerified, setIsVerified] = useState(true)//mudar o index.html

    const _history = useHistory()

    function userAlreadyLogged(){
        try {
            props.firebase.auth.currentUser.getIdTokenResult()
                .then((idTokenResult) => {

                    if (!!idTokenResult.claims.admin){
                        localStorage.setItem('@docusr_tkn',idTokenResult.token)
                        props.history.push('/admin-profiles')
                    }else{
                        if (!!idTokenResult.claims.researcher) {
                            localStorage.setItem('@resUsrTkn',idTokenResult.token)
                            props.history.push('/researcherImages')

                        }else if (!!idTokenResult.claims.doctor){
                            localStorage.setItem('@docusr_tkn',idTokenResult.token)
                            props.history.push('/medicalRecord');
                        }
                    }
                })

        } catch (error) {
            setLoginError(true)
        }
    }

    const onSubmit = async event => {
        setClicked(!clicked)
        props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then( (authUser) => {
            setEmail('')
            setPassword('')
            
            props.firebase.auth.currentUser.getIdTokenResult()
            .then((idTokenResult) => {

                if (!!idTokenResult.claims.admin){
                    localStorage.setItem('@docusr_tkn',idTokenResult.token)
                    props.history.push('/admin-profiles')
                }else{
                    if (!!idTokenResult.claims.researcher) {
                        localStorage.setItem('@resUsrTkn',idTokenResult.token)
                        props.history.push('/researcherImages')
                    }
                    else if (!!idTokenResult.claims.doctor){
                       localStorage.setItem('@docusr_tkn',idTokenResult.token)
                       props.history.push('/medicalRecord')
                    }
                }
                
            })
            .catch((error) => {
            //   console.log(error);
            })

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
        // console.log(error);
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

    // function recaptchaLoaded(){
    //     console.log('captcha loaded')
    //     setIsVerified(false)
    // }

    // function verifyCallback(response){
    //     setIsVerified(true)//////////
    // }

    // function expiredCallback(){
    //     setIsVerified(false)/////////
    // }

    return(
        <AuthUserContext.Consumer>
        {   authUser => !authUser || loginError?
        
            <div className='container-login'>
                <img src={loginImage} alt="logo" className='login-image'/>
                <form onSubmit={onSubmit}>
                    
                    <div className='inputs'>
                        <TextField error={error}
                            id="email-login-input" 
                            label={error ? errorMsg :"Usuário"} 
                            size = "small" 
                            variant="outlined"
                            className="input-fields"
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
                        
                        <a id='esqueceu-senha-button' className='text-fgtPassword' href="/reset-doc">Esqueceu sua senha?</a> <br/>

                        {/* <div className='login-recaptcha'>
                            <Recaptcha
                                sitekey="6LfAuM8ZAAAAABmqnUi4X3gPZUfB8NsvClbBPxMO"
                                render="explicit" 
                                hl="pt-BR"
                                onloadCallback={recaptchaLoaded}
                                verifyCallback={verifyCallback}
                                expiredCallback={expiredCallback}
                            />
                        </div> */}

                        <button 
                            id='entrar-button'
                            className='button less-mrgtop' 
                            type='submit' 
                            disabled={clicked}//disabled={clicked || !isVerified}
                        >
                            {clicked && !error ? 
                                <CircularProgress color='primary' size={20} /> 
                                : 'Entrar'
                            }
                        </button>

                        <button 
                            id='inicial-button'
                            className='button-back btn-marg'
                            onClick={handleBack}
                        >Página incial</button>

                    </div>

                    <div className='choose-profile'>
                        <p className='text'>É um médico? 
                            <a id='cadastre-medico-button'className='text-link' href="/create-doc">Cadastre-se aqui</a>
                        </p>
                        <p className='text-login'>É um pesquisador? 
                            <a id='cadastre-pesquisador-button' className='text-link' href="/create-res">Cadastre-se aqui</a> 
                        </p>
                    </div>
                </form>
            </div>:  userAlreadyLogged()
        }
        </AuthUserContext.Consumer>
    )
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);
  
export default SignInPage;
  
export { SignInForm };