import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.css'
import api from '../../services/api'
import Header from '../../components/Header/Admin/index'
import HeaderRES from '../../components/Header/Researcher/index'
import { Chart } from "react-google-charts"

import { AuthUserContext, withAuthorization } from '../../contexts/Session'

const Charts = (props) => {

    const history = useHistory()

    const [isAuth, setIsAuth] = useState(' ')
    const [token, setToken] = useState('')
    const [mount, setMount] = useState(true)

    const [requested, setRequested] = useState([{}]) 
    const [requestedKeys, setRequestedKeys] = useState([])
    const [provided, setProvided] = useState([{}]) 
    const [providedKeys, setProvidedKeys] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(false)

    useEffect(() => {
        props.firebase.auth.currentUser.getIdTokenResult()
        .then(async(idTokenResult) => {
            if (!!idTokenResult.claims.admin || !!idTokenResult.claims.researcher) {
                setIsAuth(true)
                setToken(idTokenResult.token)

                if(mount){ 

                    setTimeout(async() => {
                        await api.get(`/data`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        }
                        ).then((response)=>{
                            console.log(response);
                            setMount(false)

                            setRequested(Object.values(response.data.requested))
                            setRequestedKeys(Object.keys(response.data.requested))

                            setProvided(Object.values(response.data.provided))
                            setProvidedKeys(Object.keys(response.data.provided))

                            setIsLoading(false)

                        }).catch(error=>{
                            setErr(true)
                        })
                        
                    }, 1000);
                    
                }

            } else {
                setIsAuth(false)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    })

    
    const getProvidedArray = () =>{
        const data = [
            ['Mês/Ano', 'Homens', 'Mulheres', 'Não informado']
        ]
        for (let i = 0; i < provided.length; i++) {
            data.push([String(providedKeys[i]).replace('-','/'), provided[i].M, provided[i].F, provided[i].N])
        }
        return data  
    }

    const getRequestedArray = () =>{
        const data = [
            ['Mês/Ano', 'Homens', 'Mulheres', 'Não informado']
        ]
        for (let i = 0; i < requested.length; i++) {
            data.push([String(requestedKeys[i]).replace('-','/'), requested[i].M, requested[i].F, requested[i].N])
        }
        return data  
    }

    return(
        <AuthUserContext.Consumer> 
            {authUser=>
                isAuth ? 
                    <>
                        {localStorage.getItem('@isadm') ? <Header/> : <HeaderRES/>}
                        <br/><br/><br/><br/><br/>
                        <div className='charts-container'>
                            <h1 className="charts-title">Gráficos</h1>

                            {!isLoading ?
                                <>
                                    <Chart
                                        width={'530px'}
                                        height={'300px'}
                                        chartType="Bar"
                                        loader={<div>Carregando gráficos...</div>}
                                        data={getRequestedArray()}
                                        options={{
                                            chart: {
                                                title: 'Diagnósticos solicitados',
                                            },
                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                    />
                                    <br/><br/>
                                    <Chart
                                        width={'530px'}
                                        height={'300px'}
                                        chartType="Bar"
                                        data={getProvidedArray()}
                                        options={{
                                            chart: {
                                                title: 'Diagnósticos fornecidos',
                                            },
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /> <br/><br/>
                                </>
                                :
                                err && !isLoading ?
                                    <p> Erro no servidor</p>
                                    :
                                    <div className='loading-circle'>
                                        <CircularProgress/>
                                    </div>
                            }
                        </div>
                    </>
                :
                    history.push('/')
            }
        </AuthUserContext.Consumer>
    )
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Charts);