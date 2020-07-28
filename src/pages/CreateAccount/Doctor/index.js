import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { withRouter, useHistory } from 'react-router-dom'
import { compose } from 'recompose'

import loginImage from '../../../assets/Images/loginImage.svg'
import PasswordField from '../../../components/Inputs/Password/index'
import { withFirebase } from '../../../contexts/Firebase'
import api from '../../../services/api'
//import firebase from '../../../contexts/Firebase/firebase'
import './styles.css'

const SignUpPage = () => (
    <div>
      <SignUpForm />
    </div>
)

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUpFormBase (props){

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[CRM, setCRM] = useState('')
    const[specialty,setSpecialty] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[error, setError] = useState('')
    const[uid, setUid] = useState('')

    const history = useHistory()

    const [openAlert, setOpenAlert] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
    }
    async function createUser(){
        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('CRM', CRM)
        formData.append('specialty', specialty)
        formData.append('uid', uid)

        try {
            await api.post('/doctor',formData)  
        } catch (error) {
            console.log(error);
        }
    }

    function teste(){
        // props.firebase.auth.currentUser.getIdTokenResult()
        // .then((idTokenResult) => {
        //    // Confirm the user is an Admin.
        //    if (!!idTokenResult.claims.admin) {
        //      console.log('ooooooooooooooooooooooooooooppppppaaaaaa');
        //    } else {
        //      console.log('caiu no else');
        //    }
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
        console.log(props.firebase.auth);
    }

    const onSubmit = event => {

        props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                setName('');
                setEmail('');
                setPassword('');
                setError(null);
                props.history.push('/medicalRecord');
                setUid(authUser.user.uid)
            })
            .catch(error => {
                setError(error);
                console.log(error);
                setOpenAlert(true)
            });
        createUser()
        event.preventDefault();
        
    }
    function handleCancel(){
        teste()
        history.push('/')
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
                    <button className='button-back' type='button' onClick={handleCancel}>Cancelar</button>

                    <button 
                        type="submit" 
                        className='button button-resize' 
                        disabled={isInvalid}
                    >Cadastrar</button>

                </div>

                <br/><br/>

                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="error" onClose={handleClose}>{error ? error.message :'ops'}</Alert>
                </Snackbar>
            </div>

        </form>
    )
}

const SignUpForm = compose(
    withRouter,
    withFirebase)(SignUpFormBase);

export default SignUpPage

export { SignUpForm }
