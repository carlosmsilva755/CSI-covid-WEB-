import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

export default ({CRM, name, email, specialty}) => {
    return(
        <div className='container-profile-page'>

            <div>
                <h1 className="profile-title">Perfil</h1>
            </div>
            
            <div className='profile-information'>

                <TextField disabled 
                    id="name-profile"
                    defaultValue={name}
                    label="Nome" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                /> <br/> <br/>

                <TextField disabled 
                    id="email-profile"
                    defaultValue={email}
                    label="Email" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                /> <br/> <br/>

                {
                    CRM ?
                        <div>
                            <TextField disabled 
                                id="crm-profile"
                                defaultValue={CRM}
                                label="CRM" 
                                size = "small" 
                                variant="outlined"
                                className="input-fields-register"
                                /> <br/> <br/>
                        </div>
                    : null

                }
                

                <TextField disabled 
                    id="info-profile"
                    defaultValue={specialty}
                    label="Especialidade" 
                    size = "small" 
                    variant="outlined"
                    className="input-fields-register"
                /> <br/> <br/>

            </div>
            <div className='profile-buttons'>

                <button id='redefinir-button' className='button-back'>Redefinir senha</button>
                <button id='redefinir-button' className='button-back'>Excluir conta</button>
            </div>

        </div>
    )
}