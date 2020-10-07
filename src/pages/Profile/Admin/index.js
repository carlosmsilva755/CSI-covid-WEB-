import React, { useEffect, useState } from "react"

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.css'
import Header from '../../../components/Header/Admin/index'
import PasswordField from '../../../components/Inputs/Password/index'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const AdminProfile = (props) => {

    const [isAuth, setIsAuth] = useState(' ')
    const [disable, setDisable] = useState(true)
    const [disableEmail, setDisableEmail] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [mount, setMount] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [isInvalid, setIsInvalid] = useState()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordOne, setPasswordOne] = useState('')

    // const isInvalid =
    //     passwordOne !== password || password === '' || password.length < 6 || passwordOne.length < 6

    const isInvalidEmail = email === ''
    
    useEffect(() => {
        setIsInvalid(passwordOne !== password || password === '' || password.length < 6 || passwordOne.length < 6)
    }, [passwordOne, password])

    useEffect(() => {
        mount ? 
            props.firebase.auth.currentUser.getIdTokenResult()
                .then((idTokenResult) => {
                    if (!!idTokenResult.claims.admin) {
                        setIsAuth(true)
                        setEmail(idTokenResult.claims.email)
                        setMount(!mount)
                    } else {
                    setIsAuth(false)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
         : console.log()
        
        // const user = props.firebase.auth().currentUser;
        // const credential = props.firebase.auth.EmailAuthProvider.credential(
        //     user.email, 
        //     userProvidedPassword
        // )
        // console.log(credential)
    })

    const handleUpdateEmail = () => {
        
        setDisableButton(true)

        props.firebase
            .doEmailUpdate(email)
            .then(() => {
                setDisableEmail(true)
                setDisableButton(false)
                setShowModal(true)
            })
            .catch(error => {
                console.log(error)
                setDisableButton(false)
                setErrorMsg(error.message)
            })
    }

    const handleUpdatePassword = () => {

        setDisableButton(true)
        setIsInvalid(true)

        props.firebase
            .doPasswordUpdate(password)
            .then(() => {
                setDisable(true)
                setDisableButton(false)
                setShowModal(true)
            })
            .catch(error => {
                console.log(error)
                setDisableButton(false)
                setErrorMsg(error.message)
            })
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                
                    <div>
                        <Header/>
                        
                            
                        <div className='container-profile-page'>
                            
                            <h1 className="profile-title">Perfil</h1>
                            
                            {disable ? 
                                <>
                                    <TextField 
                                        disabled ={disableEmail}
                                        id="name-profile"
                                        label='Email' 
                                        size = "small" 
                                        variant="outlined"
                                        className="input-fields-register"
                                        value={email}
                                        onChange={event=>
                                            setEmail(event.target.value)
                                        }
                                    /> <br/><br/> 
                                </>
                                : null
                            }

                            
                            {disableEmail ? 
                                <PasswordField id='password-profile1'
                                    // error ={errorPassword}
                                    // errorMessage={errorPasMsg}
                                    // setError={setErrorPas}
                                    password={password} 
                                    setPassword={setPassword}
                                    disable={disable} 
                                    classname='input-fields-admin-profile' 
                                    label='Senha'
                                /> : null
                            }
                            {   disable ? null : 
                                    <> <br/>
                                        <PasswordField id='password-profile2'
                                            // error ={errorPassword}
                                            // errorMessage={errorPasMsg}
                                            // setError={setErrorPas}
                                            password={passwordOne} 
                                            setPassword={setPasswordOne}
                                            disable={disable} 
                                            classname='input-fields-admin-profile' 
                                            label='Confirmar senha'
                                        />
                                    </>
                            }
                            

                            <div className='profile-buttons'>
                                {disable && disableEmail ? 
                                    <>
                                        <button 
                                            id='atualizar-email-button' 
                                            className='button-back'
                                            onClick={e=>setDisableEmail(false)}
                                        >Atualizar email</button> 

                                        <button 
                                            id='atualizar-senha-button' 
                                            className='button-back'
                                            onClick={e=>setDisable(false)}
                                        >Atualizar senha</button>
                                    </>
                                    
                                    :
                                    <button 
                                        id='editar-dados-button' 
                                        className='button'
                                        onClick={e=> disableEmail ? handleUpdatePassword() : handleUpdateEmail()}
                                        disabled={disableEmail ? isInvalid : isInvalidEmail}
                                    >{ disableButton ? <CircularProgress color='primary' size={15} /> :'Confirmar'}</button>
                                }

                                {disable && disableEmail? null :
                                    <button 
                                        id='editar-dados-button' 
                                        className='button-back'
                                        onClick={e=> {
                                            setDisableEmail(true) 
                                            setDisable(true)
                                        }}
                                    >Cancelar</button>
                                }
                            </div>

                        </div>

                        <Dialog
                                open={showModal} 
                                //onClose={handleClose}
                                aria-labelledby="draggable-dialog-title" maxWidth='xs'
                        >
                            <DialogContent>
                                <p className='delete-modal-text'>
                                    {errorMsg ? errorMsg : 'Dados alterados com sucesso!'}
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <button 
                                    id='cancelar-conta-button'
                                    onClick={handleCloseModal} 
                                    className='button-back' 
                                >Fechar</button>
                            </DialogActions>
                        </Dialog>
                    </div>
                : 
                    console.log('NOT A DOCTOR')
            }
        </AuthUserContext.Consumer>
    )
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminProfile);