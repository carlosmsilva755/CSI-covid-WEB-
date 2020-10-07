import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.css'
import Header from '../../../components/Header/Researcher/index'
import Profile from '../../../components/Profile/index'
import api from '../../../services/api'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const ResearcherProfile = (props) => {
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    const [specialty,setSpecialty] = useState('')
    const [institution, setInstitution] = useState('')
    const [isAuth, setIsAuth] = useState(' ')

    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmation, setShowModalConfirmation] = useState(false)
    const [disable, setDisable] = useState(false)

    const [disableComponent, setDisableComponent] = useState(true)

    const history = useHistory()

    const [mount, setMount] = useState(true)

    useEffect(()=>{
        mount ? 
            (async () => {
                await api.get(`/researcher/`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('@resUsrTkn')}`
                        }
                    }
                ).then((response)=>{
                    //console.log(response.data.doctor);
                    setName(response.data.researcher.name)
                    setEmail(response.data.researcher.email)
                    setSpecialty(response.data.researcher.specialty)
                    setInstitution(response.data.researcher.institution)
                    setMount(!mount)
                }).catch(error=>{
                    console.log(error);
                })

            })() : console.log('e');

        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           if (!!idTokenResult.claims.researcher) {
             setIsAuth(true)
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

    const deleteUser = async () => {
        setDisable(true)
        
        await api.delete(`/researcher`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@resUsrTkn')}`
                }
            }
        ).then(()=>{
            props.firebase.doSignOut()
            history.push('/')
        }).catch(()=>{

        })
    }

    const handleUpdate = async () => {
        setDisableComponent(!disableComponent)
        
        const data ={
            name,
            specialty,
            institution
        }

        await api.put(`/researcher`, data,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@resUsrTkn')}`
                }
            }
        ).then(()=>{
            setShowModalConfirmation(true)
        }).catch(()=>{

        })
    }

    const handleCloseModalConfirmation = () => {
        setShowModalConfirmation(false)
        history.push('/researcherImages')
    }

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                
                    <div>
                        <Header/>
                        <Profile 
                            email={email}
                            name={name}
                            specialty={specialty}
                            institution={institution}
                            showModal={setShowModal}
                            handleUpdate={handleUpdate}
                            disable={disableComponent}
                            setDisable={setDisableComponent}
                            setName={setName}
                            setSpecialty={setSpecialty}
                            setInstitution={setInstitution}
                        />
                        <Dialog
                                open={showModal} 
                                //onClose={handleClose}
                                aria-labelledby="draggable-dialog-title" maxWidth='xs'
                        >
                            <DialogContent>
                                <p className='delete-modal-text'>
                                    Deseja excluir permanentemente essa conta? 
                                    Essa ação é irreversível.
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <button 
                                    id='cancelar-conta-button'
                                    onClick={handleCloseModal} 
                                    className='button-back' 
                                    disabled={disable}
                                >Cancelar</button>
                                <button 
                                    id='excliur-conta-button' 
                                    onClick={deleteUser}
                                    className='button button-modal'
                                    disabled={disable}
                                >
                                    { disable ? <CircularProgress color='primary' size={15} /> :'Excluir'}
                                </button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                                open={showModalConfirmation} 
                                // onClose={handleCloseModalConfirmation}
                                aria-labelledby="draggable-dialog-title" maxWidth='xs'
                        >
                            <DialogContent>
                                <p className='delete-modal-text'>
                                    {'Dados alterados com sucesso!'}
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <button 
                                    id='fechar-button'
                                    onClick={handleCloseModalConfirmation} 
                                    className='button-back' 
                                >Fechar</button>
                            </DialogActions>
                        </Dialog>
                    </div>
                : 
                    history.push('/login')
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ResearcherProfile);