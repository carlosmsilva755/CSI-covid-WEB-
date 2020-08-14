import React, { useContext } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'

//import options from "../../../assets/Icons/options.svg"
import './styles.css'
import ImageContext from '../../../contexts/Image/index'
import { useHistory } from 'react-router-dom'

export default ({diagnosis}) => {
    const { setImageV } = useContext(ImageContext)
    const history = useHistory()
    
    function handleView(){
        // console.log('deu');
        // console.log(diagnosis)
        const data = {
            "state":diagnosis.state,
            "city":diagnosis.city,
            "sex": diagnosis.sex === '' ? '' : diagnosis.sex === 'M' ? 'Masculino' : 'Feminino',
            "age":diagnosis.age,
            "temp":diagnosis.temp,
            "sat_ox":diagnosis.sat_ox,
            "info":diagnosis.info,
            "fromHome":true,
            "result":diagnosis.result,
            "date":diagnosis.createdAt,
            "_id":diagnosis.id_doctor ? diagnosis.id_doctor : diagnosis.id_researcher
        }
        localStorage.setItem('@form',JSON.stringify(data))
        localStorage.setItem('@result',diagnosis.result)
        setImageV(diagnosis.image.url)
        history.push('/view-diagnosis')
    }
    
    return (
        <div id='container-card-menu' onClick={handleView}>

            <div className="container-card-header">
                
                <p className = "card-id">{diagnosis.id_doctor ? diagnosis.id_doctor : diagnosis.id_researcher}</p>
                {/* <img className = "card-options "src={options} alt="option" onClick={handleCardChange}/> */}
               
            </div>

            <p className = "card-date">{ moment(diagnosis.createdAt).format('L') }</p>

            <div className = "container-card-img">

                <img className = "card-image"src = {diagnosis.image.url} alt="xray" />

                {   
                    diagnosis.result === 0 ?
                    <p className='card-diagnostic green-diag'> <b>NORMAL</b></p> :
                        diagnosis.result === 1 ?
                            <p className='card-diagnostic gray-diag'> <b>PNEUMONIA</b></p>:
                            <p className='card-diagnostic red-diag'> <b>COVID-19</b></p>
                }

            </div>

        </div>
    )
}