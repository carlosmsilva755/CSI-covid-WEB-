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
// import DoctorLogin from './pages/Login/Doctor/index'
// import ResearcherLogin from './pages/Login/Researcher/index'
import DoctorForgotPassword from './pages/PasswordReset/Doctor/index'
import ResearcherForgotPassword from './pages/PasswordReset/Researcher/index'
import ForgotPasswordPage from './pages/PasswordReset/Default/index'
import DoctorProfile from './pages/Profile/Doctor/index'
import ResearcherProfile from './pages/Profile/Researcher/index'
import DoctorUpload from './pages/DoctorUpload/index'
import Landing from './pages/Landing/index'
import UpdateDiagnosis from './pages/UpdateDiagnosis/index'
import ManageProfiles from './pages/_ManageProfiles/index'
import AdminProfile from './pages/Profile/Admin/index'
import BackUp from './pages/_BackUp/index'
import ContactUs from './pages/ContactUs/ContactForm/index'
import ConfirmContact from './pages/ContactUs/ConfirmEmail/index'
import Charts from './pages/Charts/index'
import ConfirmEmail from './pages/CreateAccount/ConfirmEmail/index'
import Pending from './pages/Login/Pending/index'

export default () => {
    return (
        <Switch>

            <Route exact path="/" component={Landing}/>

            <Route exact path="/login" component={Login}/>
            
            {/* <Route path="/login-doc" component={DoctorLogin}/>
            <Route path="/login-res" component={ResearcherLogin}/> */}

            <Route path='/create-doc' component={CreateDoctor}/>
            <Route path='/create-res' component={CreateResearcher}/>
            <Route path='/confirm-email' component={ConfirmEmail}/>
            <Route path='/pending-email' component={Pending}/>

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
            <Route path="/profile-admin" component ={AdminProfile}/>

            <Route path="/admin-profiles" component ={ManageProfiles}/>
            <Route path="/admin-backup" component ={BackUp}/>
            <Route path="/charts" component={Charts}/>

            <Route path="/contact" component ={ContactUs}/>
            <Route path="/confirm-contact" component ={ConfirmContact}/>
            
            <Redirect from ="*" to="/"/>

        </Switch>
    )
}