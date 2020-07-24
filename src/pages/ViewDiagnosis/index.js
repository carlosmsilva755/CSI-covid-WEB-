import React, { useEffect, useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import './styles.css'
import Header from '../../components/Header/Default/index'
import CardView from '../../components/Cards/CardView/index'
import ImageContext from '../../contexts/Image/index'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'
import api from '../../services/api'

const ViewDiagnosis = () => {

    const history = useHistory()
    const [data, setData] = useState({})
    const [resul, setResul] = useState('')
    const [showModal, setShowModal] = useState(false)

    const { ImageV, imageResearcher } = useContext(ImageContext)

    useEffect(() => {
        const _data = localStorage.getItem('@form')
        const _resul = localStorage.getItem('@result')
        //setImage(localStorage.getItem('@image'))
        setData(JSON.parse(_data))
        setResul(_resul)
    },[])

    const useStyles = makeStyles({
        root: {
          color: 'black',
          fontSize: 17,
        }
    })
    const classes = useStyles()

    async function handleConfirm(){
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
        formData.append('id_doctor', 0)
        
        const res = await api.post('/diagnoses', formData)
        console.log(res);

        history.push('/medicalRecord')
    }
    function handleOpen(){
        setShowModal(true)
    }

    function handleClose(){
        setShowModal(false)
    }

    function handleClick(){
        const isResearcher = localStorage.getItem('@isResearcher')
        
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
                                    id ='2458795' 
                                    date ={moment().format('L')} 
                                    age={data.age} 
                                    sex={data.sex} 
                                    info={data.info} 
                                    image={ImageV} 
                                    diagnosis={data.fromHome ? data.result : resul} 
                                /> 

                            </div> <br/><br/>

                            {/* {data.fromHome || localStorage.getItem('@isResearcher') ? null : <button id='disponibilizar-button'className='button button-view' onClick={handleOpen}>Disponibilizar para Pesquisa</button>}<br/><br/> */}
                            {resul.toString() === '2' && !localStorage.getItem('@isResearcher') ?
                                <button id='disponibilizar-button'className='button button-view' onClick={handleOpen}>Disponibilizar para Pesquisa</button> 
                                : null
                            }<br/><br/>
                            
                            <button id='pagina-inicial-button'className='button-back button-back2' onClick={handleClick}>Página inicial</button>

                            <Dialog
                                open={showModal} onClose={handleClose}
                                aria-labelledby="draggable-dialog-title" maxWidth='xs'
                                //className={classes.box}
                            >
                                <DialogContent>
                                    <DialogContentText className={classes.root}>
                                        Declaro que esta imagem foi devidamente anonimizada e que o diagnóstico de Covid-19 está confirmado. 
                                        Estou ciente que estou disponibilizando este diagnóstico para fins de pesquisa.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <button id='cancelar-button'onClick={handleClose} className='button-back'>Cancelar</button>
                                    <button id='confirmar-button'onClick={handleConfirm} className='button button-modal'>Confirmar</button>
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