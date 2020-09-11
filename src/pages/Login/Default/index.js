import React, {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import loginImage from '../../../assets/Images/loginImage.svg'
import DoctorLogin from '../../../assets/Icons/doctorLogin'
import ResearcherLogin from '../../../assets/Icons/t'
import './styles.css'


export default () => {
    useEffect(() => {
        localStorage.removeItem('@currentpage')
        localStorage.removeItem('@currentpageFilter')
        localStorage.removeItem('@filterNumber')
        localStorage.removeItem('@currentpageFilterRes')
        localStorage.removeItem('@filterNumberRes')
        localStorage.removeItem('@currentpageFilterUp')
        localStorage.removeItem('@filterNumberUp')

    }, [])
    const history= useHistory()
    return(
        
        <div className='container-login'>

                <img src={loginImage} alt="logo" className='login-image'/>
                
                <div className='choose-login'>

                    <h2 className='text-choose'>Realizar login como:</h2>

                    <div className='icons-choose'>

                        <Link to='/login-doc'>
                            <div className='icon-text'>
                                <DoctorLogin/>
                                <p>Médico</p>
                            </div>
                        </Link>

                        <Link to='/login-res'>
                            <div className='icon-text marg'>
                                <ResearcherLogin />
                                <p>Pesquisador</p>
                            </div>
                        </Link>
                        
                    </div>

                    <div className='login-button-back'>
                        <button 
                            id ='voltar-button' 
                            className='button-back'
                            onClick={()=>{
                                history.push('/')
                            }}
                        > Voltar para a página inicial</button>
                    </div>

                </div> <br/>

                <div className='choose-profile'>
                    <p className='text'>É um médico? <a id='cadastre-medico-button'className='text-link' href="/create-doc">Cadastre-se aqui</a> </p>
                    <p className='text-login'>É um pesquisador? <a id='cadastre-pesquisador-button' className='text-link' href="/create-res">Cadastre-se aqui</a> </p>
                </div>
            
        </div>
    )
}