import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import MedicalRecord from './pages/MedicalRecord/index'
import RegisterDiagnosis from './pages/RegisterDiagnosis/index'
import UploadImage from "./pages/UploadImage/index"
import viewDiagnosis from "./pages/ViewDiagnosis/index"
import Login from "./pages/Login/Default/index"
import ResearcherImages from './pages/ResearcherImages/index'
import CreateDoctor from './pages/CreateAccount/Doctor/index'
import CreateResearcher from './pages/CreateAccount/Researcher/index'
import DoctorLogin from './pages/Login/Doctor/index'
import ResearcherLogin from './pages/Login/Researcher/index'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            
            <Route path="/login-doc" component={DoctorLogin}/>
            <Route path="/login-res" component={ResearcherLogin}/>

            <Route path='/create-doc' component={CreateDoctor}/>
            <Route path ='/create-res' component={CreateResearcher}/>

            <Route path="/medicalRecord" component ={MedicalRecord}/>
            <Route path="/register" component ={RegisterDiagnosis}/>
            <Route path="/upload" component ={UploadImage}/>
            <Route path="/view-diagnosis" component ={viewDiagnosis}/>

            <Route path="/researcherImages" component ={ResearcherImages}/>
            
            <Redirect from ="*" to="/"/>

        </Switch>
    )
}