import React from "react"

import './styles.css'
import Header from '../../../components/Header/Researcher/index'
import Profile from '../../../components/Profile/index'

import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const ResearcherProfile = (props) => {

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                
                    <div>
                        <Header/>
                        <Profile 
                            email={'pesquisador@gmail.com'}
                            name={'Nome do usuário'}
                            specialty={'Computação'}
                        />
                    </div>
                : 
                    null
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ResearcherProfile);