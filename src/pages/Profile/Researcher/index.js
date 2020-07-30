import React from "react"
//import {useHistory} from 'react-router-dom'

//import TextField from '@material-ui/core/TextField'

import './styles.css'
import Header from '../../../components/Header/Researcher/index'
//import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const ResearcherProfile = (props) => {

    //const history = useHistory()


    // function handleAdd(authUser){
    //     history.push('/register')
    // }

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                
                    <div>
                        <Header/>
                        <h1>dd</h1>
                    </div>
                : 
                    null
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ResearcherProfile);