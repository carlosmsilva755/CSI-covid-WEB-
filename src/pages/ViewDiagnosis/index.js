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

export default () => {

    const history = useHistory()
    const [data, setData] = useState({})
    //const [image, setImage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const { ImageV } = useContext(ImageContext)

    useEffect(() => {
        const _data = localStorage.getItem('@form')
        //setImage(localStorage.getItem('@image'))
        setData(JSON.parse(_data))
    },[])

    const useStyles = makeStyles({
        root: {
          color: 'black',
          fontSize: 17,
        }
    })
    const classes = useStyles()

    function handleConfirm(){
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
                        diagnosis={data.fromHome ? data.result : localStorage.getItem('@result')} 
                    /> 

                </div> <br/><br/>

                {data.fromHome || localStorage.getItem('@isResearcher') ? null : <button id='disponibilizar-button'className='button button-view' onClick={handleOpen}>Disponibilizar para Pesquisa</button>}<br/><br/>
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
    )
}