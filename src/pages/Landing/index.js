import React from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'
import Header from '../../components/Header/Landing/index'
import CardLanding from '../../components/Cards/CardLanding/index'
import Footer from '../../components/Footer/index'

import Logo from '../../assets/Images/Landing/logo.svg'
import Info2 from '../../assets/Images/Landing/info2.svg'
import Info31 from '../../assets/Images/Landing/info3-1.svg'
import Info32 from '../../assets/Images/Landing/info3-2.svg'
import Info33 from '../../assets/Images/Landing/info3-3.svg'
import Info41 from '../../assets/Images/Landing/info4-1.svg'
import Info42 from '../../assets/Images/Landing/info4-2.svg'
import Info43 from '../../assets/Images/Landing/info4-3.svg'
import Info44 from '../../assets/Images/Landing/info4-4.svg'


export default () => {
    const history = useHistory()

    const handleLogin = () => {
        history.push('/login')
    }

    return(
        <div>
            <Header/>
            <div className='container-landing'>
                {/* FIRST INFO */}
                <div className='info1'>
                    <div className='info1-left'>

                        <h1 className='text-red'>CSI covid</h1> <br/>
                        <h2 className='text-gray'>Diagnósticos da Covid-19 por meio de imagens de raio-X.</h2>
                        <p className='text-info1'>
                            O Laboratório de Computação de Sistemas Inteligentes (CSI) em parceria com o TerraLAB,
                            desenvolveram uma solução capaz de diagnosticar os casos mundiais de pacientes com Covid-19.
                        </p>
                        <button 
                            id ='login-button' 
                            className='login-button'
                            onClick={handleLogin}
                        > Entrar</button>
                    </div>

                    <div className='info1-right'>
                        <img className='info1-image' src={Logo} alt="logo"/>
                    </div>

                </div>



                {/* SECOND INFO */}
                <div className='info2'>

                    <div className='info2-image'>
                        <img src={Info2} alt=""/>
                    </div>

                    <div className='info2-right'>
                        <p className='text-red'>Inteligência no diagnóstico</p>
                        <p className='text-gray text-boldless'>A Inteligência Artificial pode ajudar?</p>
                        <p className='text-info1'>
                            Com a tecnologia da inteligência artificial é possível realizar o diagnóstico
                            dos casos mundiais de Covid-19 por meio da análise das imagens de exames de 
                            raio-X do tórax dos pacientes, rapidamente e de maneira eficaz.
                        </p>
                    </div>
                </div>



                {/* THIRD INFO */}
                <div className='info3'>
                    <p className='info3-title'>Diagnóstico</p>
                    <p className='info3-title-gray'>Como é feito o diagnóstico?</p>

                    <div className='info3-cards'>
                        <CardLanding 
                            image={Info31}
                            text1='Aprendizado de Máquina'
                            text2='O reconhecimento de padrões no raio-X ajuda no diagnóstico.'
                        />
                        <CardLanding
                            image={Info32}
                            text1='Inteligência Artificial'
                            text2='A IA traz assertividade na análise do raio-X.'
                        />
                        <CardLanding
                            image={Info33}
                            text1='Diagnóstico médico'
                            text2='Raio-X enviados por médicos melhoram a nossa IA.'
                        />
                    </div>
                </div>



                {/* FOURTH INFO */}
                <div className='info4'>
                    <p className='info3-title'>Benefícios para a todos</p>
                    <p className='info4-text-top'>
                        Diagnóstico da COVID-19 apoiado pela Inteligência
                        artificial em suas mãos
                    </p>
                    {/* INFO 4 PART 1 */}
                    <div className = 'info41'>
                        <div className='info41-image'>
                            <img src={Info41} alt=""/>
                        </div>

                        <div className='info41-right'>
                            <p className='info4-text-red'>Benefícios para o médico</p>
                            <p className='info4-text-gray'>Diagnóstico Inteligente por raio-X</p>
                            <p className='info4-text'>
                                Com a solução CSI Covid, o médico é capaz de diagnosticar os pacientes
                                por meio do scan do raio-X a partir de um celular. A inteligência artificial
                                responde instantaneamente e com melhor acurácia e precisão que os testes 
                                tradicionais.
                            </p>
                        </div>
                    </div>

                    {/* INFO 4 PART 2 */}
                    <div className='info42'>
                        <div className='info42-left'>
                            <p className='info4-text-red'>Benefícios para a sociedade</p>
                            <p className='info4-text-gray'>Democratização do acesso ao diagnóstico</p>
                            <p className='info4-text'>
                                O diagnóstico é gratuito e para todos! Com a contribuição dos médicos
                                pode-se acompanhar melhor a evolução dos casos ao redor do mundo, para
                                reforçar as medidas de segurança e de saúde, ajudando no combate à essa
                                pandemia.
                            </p>
                        </div>

                        <div className='info42-right'>
                            <img src={Info42} alt=""/>
                        </div>

                    </div>

                    {/* INFO 4 PART 3 */}
                    <div className='info43'>
                        <div className='info43-left'>
                            <img src={Info43} alt=""/>
                        </div>

                        <div className='info43-right'>
                            <p className='info4-text-red'>Benefícios para pesquisa</p>
                            <p className='info4-text-gray'>Descoberta de conhecimento</p>
                            <p className='info4-text'>
                                Com a aplicação CSI Covid, os pesquisadores, podem analisar os
                                dados, desenvolver pesquisas em computação e epidemiologia  e 
                                realizar descobertas de conhecimento, auxiliando no combate à 
                                Covid-19 e doenças pulmonares futuras.
                            </p>
                        </div>
                    </div>

                    {/* INFO 4 PART 4 */}
                    <div className='info44'>
                        <div className='info44-left'>
                            <p className='info4-text-red'>Nossa responsabilidade</p>
                            <p className='info4-text-gray'>Segurança e privacidade</p>
                            <p className='info4-text'>
                                Os dados são utilizados somente para fins científicos de 
                                forma anonimizada, sigilosos e armazenados com máxima segurança. 
                                Eles jamais são publicados. A privacidade de todos é nossa prioridade!
                            </p>
                        </div>

                        <div className='info44-right'>
                            <img src={Info44} alt=""/>
                        </div>

                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}