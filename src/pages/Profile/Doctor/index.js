import React from "react"

import './styles.css'
import Header from '../../../components/Header/Doctor/index'
import Profile from '../../../components/Profile/index'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const DoctorProfile = (props) => {

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                
                    <div>
                        <Header/>
                        <Profile 
                            CRM={'12341'}
                            email={'medico@gmail.com'}
                            name={'Nome do usuário'}
                            specialty={'Cardiologista'}
                        />
                    </div>
                : 
                    null
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DoctorProfile);