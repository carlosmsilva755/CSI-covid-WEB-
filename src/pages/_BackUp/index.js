import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import './styles.css'
import Header from '../../components/Header/Admin/index'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'
import api from '../../services/api'

const BackUp = (props) => {

    const history = useHistory()
    const width = window.innerWidth

    const [token, setToken] = useState('')
    
    const [isAuth, setIsAuth] = useState(' ')
    const [showModal, setShowModal] = useState(false)
    const [showBackupModal, setShowBackupModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)


    useEffect(() => {

        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
            if (!!idTokenResult.claims.admin) {
                setIsAuth(true)
                setToken(idTokenResult.token)
            } else {
                setIsAuth(false)
            }
        })
        .catch((error) => {
            console.log(error);
        })

    })

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCloseBackupModal= () => {
        setShowBackupModal(false)
    }

    const handleBackup = () => {

        const config = {
            headers: { authorization: `Bearer ${token}` }
        }

        api.get('/backup', config)
        .then(response=>{
            setShowBackupModal(true)
            setShowModal(false)
        }).catch(error=>{
            setShowErrorModal(true)
            setShowBackupModal(true)
            setShowModal(false)
        })

    }

    return (
        <AuthUserContext.Consumer> 
            {authUser=>
                isAuth ? 
                    <>
                        <Header/>
                        <div className={width > 540 ? "container" : "container-responsive"}>
                            <div className= {width > 540 ? "container-navbars" : "container-navbars-responsive"}>
                              	<button
                                    id='backup-button'
                                    className='button button-backup'
                                    onClick={()=>{
                                        setShowModal(true)
                                    }}
                                >Gerar Backup</button>
                          	</div>
                        </div>

                        <Dialog
                            open={showModal} 
                            //onClose={handleClose}
                            aria-labelledby="draggable-dialog-title" maxWidth='xs'
                            //className={classes.box}
                        >
                            <DialogTitle >
                                <p className='modal-backup-text'>
                                    Deseja realizar o backup geral do sistema?
                                </p> 
                            </DialogTitle>
                            <DialogActions>
                                <button id='cancelar-button-backup'onClick={handleCloseModal} className='button-back'>Cancelar</button>
                                <button id='confirmar-button'onClick={handleBackup} className='button button-modal'>Confirmar</button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={showBackupModal} 
                            aria-labelledby="draggable-dialog-title" maxWidth='xs'
                        >
                            <DialogTitle >
                                <p className='modal-backup-text'>
                                    {showErrorModal? 'Erro ao realizar backup!':'Backup realizado com sucesso!'}
                                </p> 
                            </DialogTitle>
                            <DialogActions>
                                <button id='cancelar-button-backup'onClick={handleCloseBackupModal} className='button-back'>Fechar</button>
                            </DialogActions>
                        </Dialog>

                    </>
                :
                    history.push('/')
            }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(BackUp);