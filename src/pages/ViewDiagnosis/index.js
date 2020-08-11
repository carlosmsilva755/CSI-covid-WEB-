import React, { useEffect, useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './styles.css'
import Header from '../../components/Header/Default/index'
import CardView from '../../components/Cards/CardView/index'
import ImageContext from '../../contexts/Image/index'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'
import api from '../../services/api'

const ViewDiagnosis = (props) => {

    const history = useHistory()
    const [data, setData] = useState({})
    const [resul, setResul] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [token, setToken] = useState('')
    const [disable, setDisable] = useState(false)

    const { ImageV, imageResearcher } = useContext(ImageContext)

    useEffect(() => {
        const _data = localStorage.getItem('@form')
        const _resul = localStorage.getItem('@result')
        //setImage(localStorage.getItem('@image'))
        setData(JSON.parse(_data))
        setResul(_resul)

        props.firebase.auth.currentUser.getIdToken(false)
        .then((token) => setToken(token))
        .catch(errorMessage => console.log("Auth token retrieval error: " + errorMessage));
    },[props.firebase.auth.currentUser])

    const useStyles = makeStyles({
        root: {
          color: 'black',
          fontSize: 17,
        },
    })
    const classes = useStyles()

    //result === covid
    async function handleConfirm(){
        setDisable(true)

        const formData = new FormData();

        if(data.state)
            formData.append('state',data.state)
        if(data.city)
            formData.append('city',data.city)
        if(data.age)
            formData.append('age',data.age)
        if(data.temp)
            formData.append('temp',data.temp)
        if(data.info)
            formData.append('info',data.info)
        if(data.sex)
            formData.append('sex',data.sex)
        if(data.sat_ox)
            formData.append('sat_ox',data.sat_ox)

        console.log(imageResearcher);

        formData.append('file', imageResearcher)
        formData.append('for_research', true)
        formData.append('result', resul) 
        //formData.append('id_doctor', 0)
        
        const config = {
            headers: { authorization: `Bearer ${token}` }
        }

        await api.post('/diagnoses', 
            formData,
            config
        ).then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
            setDisable(false)
        })
        

        history.push('/medicalRecord')
    }
    function handleOpen(){
        setShowModal(true)
    }

    //If the result is not covid
    async function handleCovidNotConfirmed(){
        setDisable(true)

        const formData = new FormData();

        if(data.state)
            formData.append('state',data.state)
        if(data.city)
            formData.append('city',data.city)
        if(data.age)
            formData.append('age',data.age)
        if(data.temp)
            formData.append('temp',data.temp)
        if(data.info)
            formData.append('info',data.info)
        if(data.sex)
            formData.append('sex',data.sex)
        if(data.sat_ox)
            formData.append('sat_ox',data.sat_ox)

        formData.append('file', imageResearcher)
        formData.append('result', resul) 
        //formData.append('id_doctor', 0)

        localStorage.getItem('@isResearcher') ? formData.append('for_research', true) : console.log('')
        
        const config = {
            headers: { authorization: `Bearer ${token}` }
        }

        await api.post('/diagnoses', 
            formData,
            config
        ).then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
            setDisable(false)
        })
        

        handleClick()
    }

    //if doc wants to contribute with the ai
    async function handleJustUpload(){
        setDisable(true)

        const formData = new FormData()

        if(data.state)
            formData.append('state',data.state)
        if(data.city)
            formData.append('city',data.city)
        if(data.age)
            formData.append('age',data.age)
        if(data.temp)
            formData.append('temp',data.temp)
        if(data.info)
            formData.append('info',data.info)
        if(data.sex)
            formData.append('sex',data.sex)
        if(data.sat_ox)
            formData.append('sat_ox',data.sat_ox)

        formData.append('file', imageResearcher)
        formData.append('for_research', true)
        formData.append('result', localStorage.getItem('@resUp')) 
        
        const config = {
            headers: { authorization: `Bearer ${token}` }
        }

        await api.post('/diagnoses', 
            formData,
            config
        ).then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
            setDisable(false)
        })

        history.push('/doctorUpload')

    }

    function handleClick(){
        const isResearcher = localStorage.getItem('@isResearcher')

        if(localStorage.getItem('@justUpload')){
            history.push('/doctorUpload')
            return
        }

        isResearcher ?
            history.push('/researcherImages') :
            history.push('/medicalRecord')
    }

    return(
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ?
                    <div>
                        <Header/>
                        <div className='container-card'>
                            <div className='card-position'>

                                <CardView 
                                    id ={data._id} 
                                    date ={moment(data.date).format('L')} 
                                    age={data.age} 
                                    sex={data.sex} 
                                    info={data.info} 
                                    image={ImageV} 
                                    diagnosis={data.fromHome ? 
                                        data.result : localStorage.getItem('@justUpload')? 
                                            localStorage.getItem('@resUp') : resul
                                    } 
                                /> 

                            </div> <br/><br/>

                            {/* {data.fromHome || localStorage.getItem('@isResearcher') ? null : <button id='disponibilizar-button'className='button button-view' onClick={handleOpen}>Disponibilizar para Pesquisa</button>}<br/><br/> */}
                            {
                            data.fromHome ? null : localStorage.getItem('@justUpload') ? 
                                <button id='imagem-button'
                                    className='button button-view' 
                                    onClick={handleJustUpload}
                                    disabled={disable}
                                >Salvar Imagem</button> : 
                                resul.toString() === '2' && !localStorage.getItem('@isResearcher') ?
                                    <button id='disponibilizar-button'
                                        className='button button-view' 
                                        onClick={handleOpen}
                                    >Salvar Resultado</button> 
                                    : 
                                    <button id='disponibilizar-button'
                                        className='button button-view' 
                                        onClick={handleCovidNotConfirmed}
                                        disabled={disable}
                                    >Salvar Resultado</button>
                            }<br/><br/>
                            
                            <button id='pagina-inicial-button'className='button-back button-back2' onClick={handleClick}>Página inicial</button>

                            <Dialog
                                open={showModal} 
                                //onClose={handleClose}
                                aria-labelledby="draggable-dialog-title" maxWidth='xs'
                                //className={classes.box}
                            >
                                <DialogTitle className={classes.title}>Contribuir com pesquisa</DialogTitle>
                                <DialogContent>
                                    <DialogContentText className={classes.root}>
                                        Declaro que esta imagem foi devidamente anonimizada e que o diagnóstico de Covid-19 está confirmado. 
                                        Aperte confirmar caso queira disponibilizar este diagnóstico para fins de pesquisa.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <button id='cancelar-button'onClick={handleCovidNotConfirmed} className='button-back' disabled={disable}>Não enviar</button>
                                    <button id='confirmar-button'onClick={e=>{handleConfirm(); handleCovidNotConfirmed()}} className='button button-modal' disabled={disable}>Confirmar</button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </div>
                : 
                    null
            }
        </AuthUserContext.Consumer>
    )
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ViewDiagnosis);