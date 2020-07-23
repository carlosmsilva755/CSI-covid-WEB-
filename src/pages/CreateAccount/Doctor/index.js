import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import loginImage from '../../../assets/Images/loginImage.svg'
import PasswordField from '../../../components/Inputs/Password/index'
import { withFirebase } from '../../../contexts/Firebase'

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
    const[error, setError] = useState('')

    const onSubmit = event => {

        props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                setName('');
                setEmail('');
                setPassword('');
                setError(null);
                props.history.push('/medicalRecord');
            })
            .catch(error => {
            setError(error);
            });
  
      event.preventDefault();
    }

    const isInvalid =
        password !== confirmPassword ||
        password === '' ||
        email === '' ||
        name === '';

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
                    label="Email" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    value ={email} 
                    onChange={event => setEmail(event.target.value)} 
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

                <PasswordField 
                    password={password} 
                    setPassword={setPassword} 
                    classname='input-fields-register' 
                    label='Senha'
                    /> <br/>

                <PasswordField 
                    password={confirmPassword} 
                    setPassword={setConfirmPassword} 
                    classname='input-fields-register' 
                    label='Confirmar senha'
                    /> <br/> <br/>

                <div className='register-buttons'>
                    <button className='button-back'>Cancelar</button>

                    <button 
                        type="submit" 
                        className='button button-resize' 
                        disabled={isInvalid}
                    >Cadastrar</button>

                </div>

                <br/><br/>
                {error && <p>{error.message}</p>}
            </div>

        </form>
    )
}

const SignUpForm = compose(
    withRouter,
    withFirebase)(SignUpFormBase);

export default SignUpPage

export { SignUpForm }
