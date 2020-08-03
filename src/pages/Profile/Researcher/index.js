import React, { useEffect, useState } from "react"

import './styles.css'
import Header from '../../../components/Header/Researcher/index'
import Profile from '../../../components/Profile/index'
import api from '../../../services/api'
import { AuthUserContext, withAuthorization } from '../../../contexts/Session'

const ResearcherProfile = (props) => {
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    const [specialty,setSpecialty] = useState('')

    useEffect(()=>{
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
            }).catch(error=>{
                console.log(error);
            })

        })()
    })

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                
                    <div>
                        <Header/>
                        <Profile 
                            email={email}
                            name={name}
                            specialty={specialty}
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