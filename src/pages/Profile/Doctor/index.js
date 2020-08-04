import React, { useEffect, useState } from "react"

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

    useEffect(()=>{
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
            }).catch(error=>{
                console.log(error);
            })

        })()

        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           // Confirm the user is an Admin.
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
                        />
                    </div>
                : 
                    console.log('NOT A DOCTOR')
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DoctorProfile);