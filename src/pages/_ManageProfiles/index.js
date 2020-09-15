import React, { useEffect, useState } from "react"
import {useHistory} from 'react-router-dom'

// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
// import Pagination from '@material-ui/lab/Pagination'

import './styles.css'
// import searchButton from '../../assets/Icons/searchButton.svg'
import Card from '../../components/Cards/CardProfile/index'
import Header from '../../components/Header/Default/index'
// import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'
// import ImageContext from '../../contexts/Image/index'

const ManageProfiles = (props) => {

    // const filterOptions = [{"Filter":"Médicos"}, {"Filter":"Pesquisadores"}]
    // const width = window.innerWidth

    const history = useHistory()

    const [isAuth, setIsAuth] = useState(' ')

    useEffect(()=>{
        
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@justUpload')
        localStorage.removeItem('@formUpdate')
        localStorage.removeItem('@form')
        localStorage.removeItem('@result')
        localStorage.removeItem('@result2')
        localStorage.removeItem('@result3')
        localStorage.removeItem('@prob1')
        localStorage.removeItem('@prob2')
        localStorage.removeItem('@prob3')
        
        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           if (!!idTokenResult.claims.admin) {
             setIsAuth(true)
           } else {
             setIsAuth(false)
           }
        })
        .catch((error) => {
          console.log(error);
        })
    })

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                    
                    <div>
                        <Header/><br/><br/><br/>
                        <Card/>
                    </div>

            : 
                history.push('/login')
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ManageProfiles);