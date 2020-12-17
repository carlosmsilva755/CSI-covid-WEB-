import React, {useState} from 'react'
// import { useHistory } from 'react-router-dom'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import options from "../../../assets/Icons/options.svg"
import { ReactComponent as Block } from '../../../assets/Icons/block.svg'
import { ReactComponent as Unblock } from '../../../assets/Icons/unblock.svg'
import { ReactComponent as Pending } from '../../../assets/Icons/pending.svg'
import api from '../../../services/api'
import './styles.css'
 
export default ({profile, setNewCall, newCall})=>{

    const [anchorEl, setAnchorEl] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [isUnblocking, setIsUnblocking] = useState(false)
    const [showModalUnblock, setShowModalUnblock] = useState(false)

    const [successModal, setSuccessModal] = useState(false)
    
    const [pendingModal, setPendingModal] = useState(false)
    const [confirmPendingModal, setConfirmPendingModal] = useState(false)
    const [errorPending, setErrorPending] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const apiCall = async (data) => {

        await api.put(`/users`, data,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                }
            }
        ).then(response=>{
            setSuccessModal(true)
            setShowModal(false)
            setShowModalUnblock(false)
            setNewCall(newCall+1)
            // setIsUnblocking(false)
        }).catch(error=>{
            console.log(error.response.data)
            setDisable(false)
            setError(true)
        })
    }

    const handleBlock = async () => {
        setDisable(true)
        setIsUnblocking(false)
        const data = {
            "uid":profile._id,
            "disabled":true
        }

        apiCall(data)
    }

    const handleUnblock = async () => {
        setDisable(true)
        setIsUnblocking(true)

        const data = {
            "uid":profile._id,
            "disabled":false
        }

        apiCall(data)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setShowModalUnblock(false)
        setAnchorEl(null)
        setError(false)
    }

    const handleClosePendingModal = () =>{
        setPendingModal(false)
        setShowModalUnblock(false)
        setAnchorEl(null)
        setError(false)
    }

    const handlePending = async() =>{
        setDisable(true)

        await api.put(`/pending-researchers`, {uid: profile._id},
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                }
            }
        ).then(response=>{
            setConfirmPendingModal(true)
            setPendingModal(false)
            // console.log(response);

        }).catch(error=>{
            setDisable(false)
            setErrorPending(true)
        })
    }

    return(
        <>
            <div id='profile-card-admin'>
                <div className='profile-card-header'>
                    <div className='profile-card-header-text'>
                        {profile.CRM ? <p>Médico</p> : <p>Pesquisador</p>}
                        <p className='header-profile-text-small'>{profile.specialty}</p>
                    </div>
                    <div className='profile-card-header-options'>
                        <img 
                            src={options} 
                            alt="options" 
                            onClick={handleClick}
                            className='card-profile-option'
                        />
                    </div>
                </div>

                <p id='profile-nome'className='profile-card-header-name'>{profile.name}</p>
                <p className='profile-card-header-email'>{profile.email}</p>
                {profile.CRM ? 
                    <p className='profile-card-header-email'>{profile.CRM}</p> 
                    :  <p className='profile-card-header-email'>{profile.institution}</p>}

            </div>

            <Menu
                id="edit-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {//se tiver pendente nem aparece opcao pra bloquear
                    profile.pending === true ? 
                        null 
                        : 
                        profile.disabled ?
                            <MenuItem id='editar-button' onClick={e=>{setShowModalUnblock(true)}}>
                                <Unblock/> &nbsp; Desbloquear
                            </MenuItem>
                            :
                            <MenuItem id='editar-button' onClick={e=>setShowModal(true)}>
                                <Block/> &nbsp; Bloquear
                            </MenuItem>
                }

                {
                    profile.pending ?
                        <MenuItem id='editar-button' onClick={e=>{setPendingModal(true)}}>
                            <Pending/> &nbsp; Habilitar
                        </MenuItem>
                        :
                        null
                }
            
            </Menu>

            <Dialog
                open={showModal} 
                //onClose={handleClose}
                aria-labelledby="draggable-dialog-title" maxWidth='xs'
            >
                <DialogContent >{error ? 'Erro ao bloquear usuário':'Deseja bloquear esse usuário?'}</DialogContent>
                <DialogActions>
                    <button 
                        id='cancelar-diag-button'
                        onClick={handleCloseModal} 
                        className='button-back' 
                        disabled={disable}
                    >Cancelar</button>
                    <button 
                        id='confirmar-excliur-button' 
                        onClick={handleBlock}
                        className='button button-modal'
                        disabled={disable}
                    >
                        { disable ? <CircularProgress color='primary' size={15} /> :'Bloquear'}
                    </button>
                </DialogActions>
            </Dialog>

            {/* modal de uncblock */}
            <Dialog
                open={showModalUnblock} 
                //onClose={handleClose}
                aria-labelledby="draggable-dialog-title" maxWidth='xs'
            >
                <DialogContent >{error ? 'Erro ao desbloquear usuário':'Deseja desbloquear esse usuário?'}</DialogContent>
                <DialogActions>
                    <button 
                        id='cancelar-diag-button'
                        onClick={handleCloseModal} 
                        className='button-back' 
                        disabled={disable}
                    >Cancelar</button>
                    <button 
                        id='confirmar-excliur-button' 
                        onClick={handleUnblock}
                        className='button button-modal'
                        disabled={disable}
                    >
                        {disable ? <CircularProgress color='primary' size={15} /> :'Desbloquear'}
                    </button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={successModal} 
                //onClose={handleClose}
                aria-labelledby="draggable-dialog-title" maxWidth='xs'
            >
                <DialogContent id='bloquear-msg'>Usuário {!isUnblocking ? 'bloqueado':'desbloqueado'} com sucesso</DialogContent>
                <DialogActions>
                    <button 
                        id='cancelar-diag-button'
                        onClick={e=>{
                            setSuccessModal(false)
                            setShowModal(false)
                            setDisable(false)
                            setAnchorEl(null)
                            setShowModalUnblock(false)
                        }} 
                        className='button-back' 
                    >Fechar</button>
                </DialogActions>
            </Dialog>


            {/* PENDING MODALS */}

            <Dialog
                open={pendingModal} 
                //onClose={handleClose}
                aria-labelledby="draggable-dialog-title" maxWidth='xs'
            >
                <DialogContent >{errorPending ? 'Erro ao habilitar usuário':'Deseja habilitar esse usuário?'}</DialogContent>
                <DialogActions>
                    <button 
                        id='cancelar-diag-button'
                        onClick={handleClosePendingModal} 
                        className='button-back' 
                        disabled={disable}
                    >Cancelar</button>
                    <button 
                        id='confirmar-excliur-button' 
                        onClick={handlePending}
                        className='button button-modal'
                        disabled={disable}
                    >
                        {disable ? <CircularProgress color='primary' size={15} /> :'Habilitar'}
                    </button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={confirmPendingModal} 
                //onClose={handleClose}
                aria-labelledby="draggable-dialog-title" maxWidth='xs'
            >
                <DialogContent id='bloquear-msg'>Usuário habilitado com sucesso</DialogContent>
                <DialogActions>
                    <button 
                        id='cancelar-diag-button'
                        onClick={e=>{
                            setConfirmPendingModal(false)
                            setDisable(false)
                            setNewCall(newCall+1)
                            setAnchorEl(null)
                            // setShowModalUnblock(false)
                        }} 
                        className='button-back' 
                    >Fechar</button>
                </DialogActions>
            </Dialog>
        </>
    )
}