import React from "react"
//import {useHistory} from 'react-router-dom'

//import TextField from '@material-ui/core/TextField'

import './styles.css'
import Header from '../../../components/Header/Doctor/index'
//import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const DoctorProfile = (props) => {

    // const history = useHistory()


    // function handleAdd(authUser){
    //     history.push('/register')
    // }

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                
                    <div>
                        <Header/>
                    </div>
                : 
                    null
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DoctorProfile);