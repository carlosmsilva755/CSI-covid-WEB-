import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

export default ({CRM,institution, name, email, specialty, showModal, handleUpdate, disable, setDisable, setName, setCRM, setSpecialty, setInstitution}) => {
    return(
        <div className='container-profile-page'>

            <div>
                <h1 className="profile-title">Perfil</h1>
            </div>
            
            <div className='profile-information'>

                <TextField 
                    disabled ={disable}
                    id="name-profile"
                    label='Nome' 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    value={name}
                    onChange={event=>
                        setName(event.target.value)
                    }
                /> <br/> <br/>

                <TextField 
                    disabled
                    id="email-profile"
                    label='Email'
                    value={email} 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                /> <br/> <br/>

                {
                    CRM ?
                        <div>
                            <TextField 
                                disabled = {disable}
                                id="crm-profile"
                                label='CRM'
                                value={CRM} 
                                size = "small" 
                                variant="outlined"
                                className="input-fields-register"
                                onChange={event=>
                                    setCRM(event.target.value)
                                }
                                /> <br/> <br/>
                        </div>
                    : null

                }

                {
                    institution ?
                        <div>
                            <TextField 
                                disabled = {disable}
                                id="crm-profile"
                                label='Instituição'
                                value={institution} 
                                size = "small" 
                                variant="outlined"
                                className="input-fields-register"
                                onChange={event=>
                                    setInstitution(event.target.value)
                                }
                                /> <br/> <br/>
                        </div>
                    : null

                }
                
                <TextField 
                    disabled ={disable}
                    id="info-profile"
                    label='Especialidade'
                    value={specialty}
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                    onChange={event=>
                        setSpecialty(event.target.value)
                    }
                /> <br/> <br/>

            </div>
            <div className='profile-buttons'>

                {disable ? 
                    <button 
                        id='editar-dados-button' 
                        className='button-back'
                        onClick={e=>setDisable(false)}
                    >Editar dados</button>
                    :
                    <button 
                        id='editar-dados-button' 
                        className='button'
                        onClick={e=>handleUpdate()}
                    >Confirmar</button>
                }

                {
                    disable ? 
                    <button 
                        id='excluir-button' 
                        className='button-back'
                        onClick={e=>{
                            showModal(true)
                        }}
                    >Excluir conta</button> 
                    :
                    <button 
                        id='editar-dados-button' 
                        className='button-back'
                        onClick={e=>setDisable(true)}
                    >Cancelar</button>
                }
            </div>

        </div>
    )
}