import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import emailjs from 'emailjs-com'
import Recaptcha from 'react-recaptcha'

import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import loginImage from '../../../assets/Images/loginImage.svg'
import './styles.css'

export default () => {
    const history = useHistory()
    const errorMsg = 'Preencha este campo'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [disable, setDisabled] = useState(false)

    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorSubject, setErrorSubject] = useState(false)
    const [errorText, setErrorText] = useState(false)

    const [recaptchaValid, setRecaptchaValid] = useState(true)

    const isInvalid =
        subject === '' ||
        message === '' ||
        email === '' ||
        name === '' ||
        recaptchaValid === false

    const onSubmit = (e) => {
        
        if(name === ''){
            setErrorName(true)
            return
        }else if(email === ''){
            setErrorEmail(true)
            return
        }else if(subject === ''){
            setErrorSubject(true)
            return
        }else if(message === ''){
            setErrorText(true)
            return
        }

        if(recaptchaValid){
            setDisabled(true)
            e.preventDefault()

            emailjs.sendForm('gmail', 'template_ms19xmh', e.target, 'user_Jbc4K98cJitzMfLdnkOUf')
                .then((result) => {
                    localStorage.setItem('@contactSenderName',name)
                    history.push('/confirm-contact')
    
                }, (error) => {
                    console.log(error.text)
                })
        }
    }

    function recaptchaLoaded(){
        console.log('captcha loaded')
        //quando carregar vai deixar o botao bugado, se n carregar n bloqueia o botao
        if(process.env.REACT_APP_ENV !== "dev")//quando estiver na aws
            setRecaptchaValid(false)
    }

    function verifyCallback(response){
        setRecaptchaValid(true)
    }

    function expiredCallback(){
        if(process.env.REACT_APP_ENV !== "dev")//quando estiver na aws
            setRecaptchaValid(false)
    }

    const handleCancel = () => {
        history.push('/')
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='container-login'>
                <img src={loginImage} alt="" className='login-image'/>
                <div className='inputs'>
                    <TextField error={errorName}
                        id="name-contact" 
                        label={errorName ? errorMsg :"Nome completo"} 
                        size = "small" 
                        variant="outlined"
                        className="input-fields"
                        value ={name} 
                        name='name'
                        onChange={event => {
                            setName(event.target.value);
                            setErrorName(false)
                        }} 
                    /> <br/><br/>
                    <TextField error={errorEmail}
                        id="email-contact" 
                        label={errorEmail ? errorMsg :"Email"} 
                        size = "small" 
                        variant="outlined"
                        className="input-fields"
                        value ={email} 
                        name='email'
                        onChange={event => {
                            setEmail(event.target.value)
                            setErrorEmail(false)
                        }} 
                    /> <br/><br/>
                    <TextField error={errorSubject}
                        id="subject-contact" 
                        label={errorSubject ? errorMsg :"Assunto"} 
                        size = "small" 
                        variant="outlined"
                        className="input-fields"
                        value ={subject} 
                        name='subject'
                        onChange={event => {
                            setSubject(event.target.value)
                            setErrorSubject(false)
                        }} 
                    /> <br/><br/>
                    <TextField error={errorText}
                        id="info-select" 
                        multiline={true} 
                        rows = {10}
                        label={errorText? errorMsg :"Mensagem" }
                        type="number" 
                        variant="outlined" 
                        className="clinical-info"
                        value={message}
                        name='message'
                        onChange={event => {
                            setMessage(event.target.value)
                            setErrorText(false)
                        }}
                    /> <br/><br/>
                    <br/><br/>
                    <div className='login-recaptcha'>
                        <Recaptcha
                            sitekey="6Le9NtgZAAAAAJwIxQ175-18vtMOC6ijmaWPn6PZ"
                            render="explicit" 
                            hl="pt-BR"
                            onloadCallback={recaptchaLoaded}
                            verifyCallback={verifyCallback}
                            expiredCallback={expiredCallback}
                        />
                    </div>

                    <div className='register-buttons-contact'>
                        <button className='button-back' type='button' onClick={handleCancel} id='cancelar-button'>Cancelar</button>

                        <button 
                            type="submit" 
                            className='button button-resize' 
                            disabled={isInvalid || disable}
                            id='enviar-button'
                        >
                            { disable? 
                                <CircularProgress color='secondary' size={20} /> 
                                : 'Enviar'
                            }
                        </button>

                    </div>
                </div>
            </div>
            <br/><br/>
        </form>      
    )
}
