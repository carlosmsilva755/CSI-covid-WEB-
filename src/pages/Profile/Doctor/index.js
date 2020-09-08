import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.css'
import Header from '../../../components/Header/Doctor/index'
import Profile from '../../../components/Profile/index'
import api from '../../../services/api'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const DoctorProfile = (props) => {

    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    const [specialty,setSpecialty] = useState('')
    const [CRM, setCRM] = useState('')
    const [isAuth, setIsAuth] = useState(' ')

    const [showModal, setShowModal] = useState(false)
    const [disable, setDisable] = useState(false)

    const [disableComponent, setDisableComponent] = useState(true)

    const history = useHistory()

    const [mount, setMount] = useState(true)

    useEffect(()=>{
        mount ? 
            (async () => {
                await api.get(`/doctor/`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                        }
                    }
                ).then((response)=>{
                    //console.log(response.data.doctor);
                    setName(response.data.doctor.name)
                    setEmail(response.data.doctor.email)
                    setSpecialty(response.data.doctor.specialty)
                    setCRM(response.data.doctor.CRM)
                    setMount(!mount)
                }).catch(error=>{
                    console.log(error);
                })

            })() : console.log('e');

        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           if (!!idTokenResult.claims.doctor) {
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

    const deleteUser = () => {
        setDisable(true)
        // props.firebase.doDeleteUser()
        history.push('/')
    }

    const handleUpdate = async () => {
        
        const data ={
            name,
            specialty,
            CRM
        }

        await api.put(`/doctor`, data,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                }
            }
        ).then(()=>{
            window.location.reload()
        }).catch(()=>{

        })
    }

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                
                    <div>
                        <Header/>
                        <Profile 
                            CRM={CRM}
                            email={email}
                            name={name}
                            specialty={specialty}
                            showModal={setShowModal}
                            handleUpdate={handleUpdate}
                            disable={disableComponent}
                            setDisable={setDisableComponent}
                            setName={setName}
                            setSpecialty={setSpecialty}
                            setCRM={setCRM}
                        />
                        <Dialog
                                open={showModal} 
                                //onClose={handleClose}
                                aria-labelledby="draggable-dialog-title" maxWidth='xs'
                        >
                            <DialogContent>
                                <p className='delete-modal-text'>
                                    Deseja confirmar a exclusão dessa conta? 
                                    Essa ação é irreversível!
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
                    </div>
                : 
                    console.log('NOT A DOCTOR')
            }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DoctorProfile);