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
import DoctorForgotPassword from './pages/PasswordReset/Doctor/index'
import ResearcherForgotPassword from './pages/PasswordReset/Researcher/index'
import ForgotPasswordPage from './pages/PasswordReset/Default/index'
import DoctorProfile from './pages/Profile/Doctor/index'
import ResearcherProfile from './pages/Profile/Researcher/index'
import DoctorUpload from './pages/DoctorUpload/index'
import Landing from './pages/Landing/index'
import UpdateDiagnosis from './pages/UpdateDiagnosis/index'

export default () => {
    return (
        <Switch>

            <Route exact path="/" component={Landing}/>

            <Route exact path="/login" component={Login}/>
            
            <Route path="/login-doc" component={DoctorLogin}/>
            <Route path="/login-res" component={ResearcherLogin}/>

            <Route path='/create-doc' component={CreateDoctor}/>
            <Route path='/create-res' component={CreateResearcher}/>

            <Route path='/reset-email' component={ForgotPasswordPage}/>
            <Route path='/reset-doc' component={DoctorForgotPassword}/>
            <Route path='/reset-res' component={ResearcherForgotPassword}/>
            
            <Route path="/medicalRecord" component ={MedicalRecord}/>
            <Route path="/doctorUpload" component ={DoctorUpload}/>

            <Route path="/researcherImages" component ={ResearcherImages}/>
            
            <Route path="/register" component ={RegisterDiagnosis}/>
            <Route path="/upload" component ={UploadImage}/>
            <Route path="/view-diagnosis" component ={viewDiagnosis}/>
            <Route path="/update-diagnosis" component ={UpdateDiagnosis}/>

            <Route path="/profile-doc" component ={DoctorProfile}/>
            <Route path="/profile-res" component ={ResearcherProfile}/>
            
            <Redirect from ="*" to="/"/>

        </Switch>
    )
}