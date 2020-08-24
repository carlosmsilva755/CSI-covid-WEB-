import React, { useContext } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import options from "../../../assets/Icons/options.svg"
import Update from '../../../assets/Icons/update.js'
import DeleteIcon from '../../../assets/Icons/delete.js'

import './styles.css'
import ImageContext from '../../../contexts/Image/index'
import { useHistory } from 'react-router-dom'

export default ({diagnosis}) => {
    const { setImageV } = useContext(ImageContext)
    const history = useHistory()
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    function handleView(){
        // console.log('deu');
        // console.log(diagnosis)
        const data = {
            "state":diagnosis.state,
            "city":diagnosis.city,
            "age":diagnosis.age,
            "temp":diagnosis.temp,
            "sat_ox":diagnosis.sat_ox,
            "info":diagnosis.info,
            "fromHome":true,
            "result":diagnosis.result,
            "date":diagnosis.createdAt,
            "_id":diagnosis.id_doctor ? diagnosis.id_doctor : diagnosis.id_researcher
        }
        if(diagnosis.sex){
            data.sex = diagnosis.sex === 'F'? 'Feminino' : diagnosis.sex === 'M' ? 'Masculino' : 'Feminino'
        }

        localStorage.setItem('@form',JSON.stringify(data))
        localStorage.setItem('@result',diagnosis.result)
        if(diagnosis.prob1) {
            localStorage.setItem('@result2', diagnosis.result2)
            localStorage.setItem('@result3', diagnosis.result3)
            localStorage.setItem('@prob1',diagnosis.prob1)
            localStorage.setItem('@prob2',diagnosis.prob2)
            localStorage.setItem('@prob3',diagnosis.prob3)
        }
        setImageV(diagnosis.image.url)
        history.push('/view-diagnosis')
    }

    const handleUpadate = () => {

    }

    const handleDelete = () => {
        
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setAnchorEl(null)
    }

    return (
        <div id='container-card-menu' >

            <div className="container-card-header">
                
                <p className = "card-id-menu">{diagnosis.id_doctor ? diagnosis.id_doctor : diagnosis.id_researcher}</p>
                <img id='options-button' className = "card-options "src={options} alt="option" onClick={handleClick}/>
               
            </div>

            <p className = "card-date">{ moment(diagnosis.createdAt).format('L') }</p>

            <div className = "container-card-img" onClick={handleView}>

                <img className = "card-image"src = {diagnosis.image.url} alt="xray" />

                {   
                    diagnosis.result === 0 || diagnosis.result === '0'?
                    <p className='card-diagnostic green-diag'> <b>NORMAL</b></p> :
                        diagnosis.result === 1 || diagnosis.result === '1'?
                            <p className='card-diagnostic gray-diag'> <b>PNEUMONIA</b></p>:
                            <p className='card-diagnostic red-diag'> <b>COVID-19</b></p>
                }

            </div>

            <Menu
                id="edit-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem id='editar-button' onClick={handleUpadate}>
                    <Update/> &nbsp; Editar
                </MenuItem>
                
                <MenuItem id='excluir-button' onClick={e=>setShowModal(true)}>
                    <DeleteIcon/> &nbsp; Excluir
                </MenuItem> 
            </Menu>

            <Dialog
                    open={showModal} 
                    //onClose={handleClose}
                    aria-labelledby="draggable-dialog-title" maxWidth='xs'
                    //className={classes.box}
            >
                <DialogContent >Deseja excluir esse diagnóstico?</DialogContent>
                <DialogActions>
                   <button id='cancelar-diag-button'onClick={handleCloseModal} className='button-back'>Cancelar</button>
                    <button id='confirmar-excliur-button' onClick={handleDelete} className='button button-modal'>Excluir</button>
                </DialogActions>
            </Dialog>

        </div>
    )
}