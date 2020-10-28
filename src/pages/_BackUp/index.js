import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.css'
import Header from '../../components/Header/Admin/index'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'
import api from '../../services/api'
import months from '../../utils/months/months'
// import CardBackup from '../../components/Cards/CardBackup/index'

const BackUp = (props) => {

    const history = useHistory()
    const width = window.innerWidth

    const [token, setToken] = useState('')
    
    const [isAuth, setIsAuth] = useState(' ')
    const [showModal, setShowModal] = useState(false)
    const [showBackupModal, setShowBackupModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const dates = ["2020","2021","2022","2023","2024","2025","2026","2027"]
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const [file, setFile] = useState('')
    const [restoreModal, setRestoreModal] = useState(false)

    // const prof = {
    //     "CRM":12,
    //     "specialty":"specialty",
    //     "name":"name",
    //     "email":"email",
    //     "institution":"ins"
    // }

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

    /*
    useEffect(() => {
        (async () => {
            
            await api.get(`/view-backup`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                    }
                }
            ).then(response=>{
                console.log(response);
            }).catch(error=>
                props.firebase.auth.currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        localStorage.setItem('@docusr_tkn',idTokenResult.token)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            )

        })()
    }, [props.firebase.auth.currentUser])
*/
    const handleCloseModal = () => {
        setShowModal(false)
        setDisableButton(false)
    }

    const handleCloseBackupModal= () => {
        setShowBackupModal(false)
    }

    const handleBackup = () => {
        setDisableButton(true)

        const config = {
            headers: { 
                authorization: `Bearer ${token}`, 
            },
            responseType: 'blob' 
        }
        
        api.get('/backup', config)
        .then(response=>{
            setShowBackupModal(true)
            setShowModal(false)
            setDisableButton(false)
            console.log(response)

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = downloadUrl
            link.setAttribute('download', `${moment().format('L')}-backup.zip`)
            document.body.appendChild(link)
            link.click()

        }).catch(error=>{
            setShowErrorModal(true)
            setShowBackupModal(true)
            setShowModal(false)
            setDisableButton(false)

        })

    }

    const handleRestore = (event) => {

        setFile(event.target.files[0])
        setRestoreModal(true)
        
    }

    const handleRestoreAPI = () =>{
        setDisableButton(true)

        const config = {
            headers: { 
                authorization: `Bearer ${token}`, 
                'Content-Type': 'application/octet-stream'
            },
        }

        api.put('/backup', file, config)
        .then(response=>{
            setRestoreModal(true)
            setShowModal(false)
            setDisableButton(false)
            console.log(response)

        }).catch(error=>{
            setShowErrorModal(true)
            setRestoreModal(true)
            setShowModal(false)
            setDisableButton(false)

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
                                <TextField 
                                    id="mes-select" 
                                    size="small" 
                                    select disabled
                                    label="Mês"
                                    className="search-input backup-select"
                                    variant="outlined" 
                                    value ={month} 
                                    onChange={event => {
                                        setMonth(event.target.value)
                                    }}
                                >
                                    {months.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))
                                    }
                                </TextField>
                                <div className='mrg-back'>
                                    <TextField 
                                        id="ano-select" 
                                        size="small" 
                                        select disabled
                                        label="Ano"
                                        className="search-input backup-select" // align-left
                                        variant="outlined" 
                                        value ={year} 
                                        onChange={event => {
                                            setYear(event.target.value)
                                        }}
                                    >
                                        {dates.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))
                                        }
                                    </TextField> 
                                </div>
                                
                              	<button
                                    id='backup-button'
                                    className='button button-backup'
                                    onClick={()=>{
                                        setShowModal(true)
                                    }}
                                >Gerar Backup</button>
                          	</div>
                            
                            <div className='backup-container'>
                                <div className='box-buttons'>
                                    <div className='content-box'>
                                        {/* <CardBackup profile={prof}/>
                                        <CardBackup profile={prof}/>
                                        <CardBackup profile={prof}/>
                                        <CardBackup profile={prof}/>
                                        <CardBackup profile={prof}/>
                                        <CardBackup profile={prof}/> */}
                                    </div>
                                    <div className='box-buttons-cont'>

                                        <button
                                            id='backup-button'
                                            className='button button-backup-box'
                                            disabled
                                            onClick={()=>{
                                            }}
                                        >Exportar Backup</button>
                                        
                                        <label for="restaurar-button">
                                            <div className='restore-button button-backup-box'>
                                                <p className='algn-cntr'>Restaurar Backup</p>
                                            </div>
                                        </label>
                                        <input id='restaurar-button' 
                                            name='file' 
                                            type='file' 
                                            onChange = {handleRestore} 
                                        />

                                    </div>

                                </div>
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
                                    {disableButton? 
                                        'Realizando backup geral do sistema!':
                                        'Deseja realizar o backup geral do sistema?'
                                    }
                                </p> 
                            </DialogTitle>
                            <DialogActions>
                                <button id='cancelar-button-backup'
                                    onClick={handleCloseModal} 
                                    className='button-back'
                                    // disabled={disableButton}
                                >Cancelar</button>
                                <button 
                                    id='confirmar-button' 
                                    onClick={handleBackup} 
                                    disabled={disableButton}
                                    className='button button-modal'
                                >{disableButton ? 
                                    <CircularProgress color='primary' size={20} /> 
                                    : 'Confirmar'
                                }</button>
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

                        <Dialog
                            open={restoreModal} 
                            aria-labelledby="draggable-dialog-title" maxWidth='xs'
                        >
                            <DialogTitle >
                                <p className='modal-backup-text'>
                                    {disableButton? 
                                        'Restaurando backup':
                                        'Confirmar restauração de backup?'
                                    }
                                </p> 
                            </DialogTitle>
                            <DialogActions>
                                <button id='cancelar-button-backup'
                                    onClick={()=>{
                                        setRestoreModal(false)
                                    }} 
                                    className='button-back'
                                    disabled={disableButton}
                                >Cancelar</button>
                                <button 
                                    id='confirmar-button' 
                                    onClick={handleRestoreAPI} 
                                    disabled={disableButton}
                                    className='button button-modal'
                                >{disableButton ? 
                                    <CircularProgress color='primary' size={20} /> 
                                    : 'Confirmar'
                                }</button>
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