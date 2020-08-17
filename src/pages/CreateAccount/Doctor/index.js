import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter, useHistory } from 'react-router-dom'
import { compose } from 'recompose'

import loginImage from '../../../assets/Images/loginImage.svg'
import PasswordField from '../../../components/Inputs/Password/index'
import { withFirebase } from '../../../contexts/Firebase'
import api from '../../../services/api'
import './styles.css'

const SignUpPage = () => (
    <div>
      <SignUpForm />
    </div>
)

function SignUpFormBase (props){

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[CRM, setCRM] = useState('')
    const[specialty,setSpecialty] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')

    const[error, setError] = useState(false)
    const[errorMsg, setErrorMsg] = useState('')
    const[errorPassword, setErrorPas]= useState(false)
    const[errorPasMsg, setErrorPasMsg] = useState('')

    const[clicked, setClicked] = useState(false)

    const history = useHistory()

    async function createDoctor(){

        const data = {
            password,
            name,
            email,
            CRM,
            specialty
        }

        setClicked(!clicked)

        await api.post('/doctor', data)
        .then(response => {
            console.log(response)
            props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                setEmail('')
                setPassword('')
                setError(null);
                props.firebase.auth.currentUser.getIdToken(false)
                .then((token) => {
                    localStorage.setItem('@docusr_tkn',token)
                })
                .catch(errorMessage => 
                    console.log("Auth token retrieval error: " + errorMessage)
                )
                props.history.push('/medicalRecord');
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });

        }).catch(error => {
            handleErrors(error.response.data.message)
            setError(true)
            setClicked(false)
        })
    }

    const onSubmit = event => {
        
        if(confirmPassword !== password){
            setErrorPas(true)
            setErrorPasMsg('As senhas devem ser iguais')
        }else if(confirmPassword.length < 6){
            setErrorPas(true)
            setErrorPasMsg('A senha deve conter mais de 6 dígitos')
        }
        else{
            createDoctor();
        }
        
        event.preventDefault();
        
    }

    function handleCancel(){
        history.push('/login')
    }

    function handleErrors(error){
        console.log(error);

        if(error.error === 'invalid or malformed input: email'){
            setErrorMsg('Email inválido')
        }
    }

    const isInvalid =
        confirmPassword === '' ||
        password === '' ||
        email === '' ||
        name === '' ||
        CRM === '' ||
        specialty === '';

    return(
        <form onSubmit={onSubmit}>

            <div className='container-register-user'>
                <img src={loginImage} alt="logo" className='login-image'/> <br/> <br/>
                
                <TextField id="name-input" 
                    label="Nome completo" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    value ={name} 
                    onChange={event => setName(event.target.value)} 
                    /> <br/> <br/>
                
                <TextField id="email-input"
                    error={error} 
                    label={error ? errorMsg:"Email"} 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    value ={email} 
                    onChange={event => {
                        setEmail(event.target.value)
                        setError(false)
                    }} 
                    /> <br/> <br/>

                <TextField id="crm-input" 
                    label="CRM" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    value ={CRM} 
                    onChange={event => setCRM(event.target.value)} 
                    /> <br/> <br/>

                <TextField id="specialty-input" 
                    label="Especialidade" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    value ={specialty} 
                    onChange={event => setSpecialty(event.target.value)} 
                    /> <br/> <br/>

                <PasswordField id='password'
                    error ={errorPassword}
                    errorMessage={errorPasMsg}
                    setError={setErrorPas}
                    password={password} 
                    setPassword={setPassword} 
                    classname='input-fields-register' 
                    label='Senha'
                    /> <br/>

                <PasswordField id='password2'
                    error ={errorPassword}
                    errorMessage={errorPasMsg}
                    setError={setErrorPas}
                    password={confirmPassword} 
                    setPassword={setConfirmPassword} 
                    classname='input-fields-register' 
                    label='Confirmar senha'
                    /> <br/> <br/>

                <div className='register-buttons'>
                    <button className='button-back' type='button' onClick={handleCancel} id='cancelar-button'>Cancelar</button>

                    <button 
                        type="submit" 
                        className='button button-resize' 
                        disabled={isInvalid}
                        id='cadastrar-button'
                    >
                        {clicked && !error &&!errorPassword ? 
                            <CircularProgress color='secondary' size={20} /> 
                            : 'Cadastrar'
                        }
                    </button>

                </div>

                <br/><br/>

            </div>

        </form>
    )
}

const SignUpForm = compose(
    withRouter,
    withFirebase)(SignUpFormBase);

export default SignUpPage

export { SignUpForm }
