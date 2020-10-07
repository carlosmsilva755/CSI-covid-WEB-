import React from 'react'

import './styles.css'
import Logo from '../../assets/Images/Landing/Footer/logo.svg'
import Internet from '../../assets/Icons/Landing/Footer/internet.svg'
import Email from '../../assets/Icons/Landing/Footer/email.svg'
import Local from '../../assets/Icons/Landing/Footer/local.svg'
import Ufop from '../../assets/Images/Landing/Footer/ufop.svg'
import CSI from '../../assets/Images/Landing/Footer/csilab.svg'
import TerraLAB from '../../assets/Images/Landing/Footer/terralab.svg'
import Decom from '../../assets/Images/Landing/Footer/decom.svg'
import Ufpr from '../../assets/Images/Landing/Footer/ufpr.svg'
import {ReactComponent as ResponsiveImages} from '../../assets/Images/Landing/Footer/responsiveFooter.svg'

export default () => {

    return(
        <div className='landing-footer'>

            <div className='footer-content'>
                {
                    window.innerWidth > 540 ?
                        <img src={Logo} alt=""/> : null
                }

                <div className = 'footer-text'>
                    <p className = 'footer-text-title'>Contato</p>

                    <div className='icon-and-text frc-mrg'>
                        <img src={Internet} alt=""/>
                        <p className = 'footer-text-icon'>&nbsp; &nbsp;http://www.decom.ufop.br/csilab/</p>
                    </div>

                    <div className='icon-and-text'>
                        <img src={Email} alt=""/>
                        <p className = 'footer-text-icon'>&nbsp; &nbsp;csilab.decom@ufop.edu.br</p>
                    </div>

                    <div className='icon-and-text'>
                        <img src={Local} alt=""/>
                        <p className = 'footer-text-icon'>
                            &nbsp; &nbsp;Universidade Federal de Ouro Preto
                            &nbsp; &nbsp;Departamento de Computação
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;ICEB II – Sala 13
                        </p>
                    </div>

                </div>
                
                
                {
                    window.innerWidth > 540 ? 
                        <div className = 'footer-container-links'>

                            <a href="https://ufop.br/" target="_blank" rel="noopener noreferrer" className='image'>
                                <img className = 'footer-images' src={Ufop} alt=""/>
                            </a>

                            <a href="http://www.decom.ufop.br/csilab/" target="_blank" rel="noopener noreferrer" className='image'>
                                <img className = 'footer-images' src={CSI} alt=""/>
                            </a>

                            <a href="http://www2.decom.ufop.br/terralab/" target="_blank" rel="noopener noreferrer" className='image'>
                                <img className = 'footer-images' src={TerraLAB} alt=""/>
                            </a> 

                            <a href='http://www3.decom.ufop.br/decom/inicio/' target="_blank" rel="noopener noreferrer" className='image'>
                                <img className = 'footer-images' src={Decom} alt=""/>
                            </a>
                            <a href="https://www.ufpr.br/portalufpr/" target="_blank" rel="noopener noreferrer" className='image'>
                                <img className = 'footer-images' src={Ufpr} alt=""/>
                            </a>
                        </div>

                    : 
                        <div className='resposive-footer-images'>
                            <ResponsiveImages/>
                        </div>
                }

            </div>

        </div>
    )
}