import React, { useContext } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'

//import options from "../../../assets/Icons/options.svg"
import './styles.css'
import ImageContext from '../../../contexts/index'
import { useHistory } from 'react-router-dom'

export default ({diagnosis}) => {
    const { setImageV } = useContext(ImageContext)
    const history = useHistory()
    // function handleCardChange(){
    //     console.log("tests");
    // }
    

    function handleView(){
        console.log('deu');

        const data = {
            "state":diagnosis.state,
            "city":diagnosis.city,
            "sex": diagnosis.sex === '' ? '' : diagnosis.sex === 'M' ? 'Masculino' : 'Feminino',
            "age":diagnosis.age,
            "temp":diagnosis.temp,
            "sat_ox":diagnosis.sat_ox,
            "info":diagnosis.info,
            "fromHome":true,
            "result":diagnosis.result
        }
        localStorage.setItem('@form',JSON.stringify(data))

        setImageV(diagnosis.image.url)
        history.push('/view-diagnosis')
    }
    
    return (
        <div id='container-card-menu'>

            <div className="container-card-header">
                
                <p className = "card-id">{diagnosis.image.size}</p>
                {/* <img className = "card-options "src={options} alt="option" onClick={handleCardChange}/> */}
               
            </div>

            <p className = "card-date">{ moment(diagnosis.createdAt).format('L') }</p>

            <div className = "container-card-img">

                <img className = "card-image"src = {diagnosis.image.url} alt="xray" onClick={handleView}/>

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