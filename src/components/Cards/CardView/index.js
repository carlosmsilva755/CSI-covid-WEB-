import React from 'react'

import './styles.css'

export default ({id, date, age, sex, info, image, diagnosis}) => {
    return(
        <div className='card-view'>

            <div className='card-left'><br/>
                <h1 className = 'card-id'>{id}</h1>
                <p className = 'card-date'>{date}</p>
                <img src={image} alt='xray' className='card-img'/>
            </div>

            <div className ='card-right'>
                {   
                    diagnosis === '0' || diagnosis === 0 ?
                    <p className='card-diagnosis green-diag'> <b>NORMAL</b></p> :
                        diagnosis === '1' || diagnosis === 1?
                            <p className='card-diagnosis gray-diag'> <b>PNEUMONIA</b></p>:
                            <p className='card-diagnosis red-diag'> <b>COVID-19</b></p>
                }

                {age ? <p id='idade-text' className='card-text'>Idade: {age} anos</p> : <p id='idade-text' className='card-text'>Idade: Não informada</p>}
                {sex ? <p id='sexo-text' className='card-text'>Sexo: {sex}</p> : <p id='sexo-text' className='card-text'>Sexo: Não informado</p>}
                {info ? <p id='info-text' className='card-text'>Informações clínicas: </p> : <p id='info-text' className='card-text'>Informações clínicas: Não informado</p>}
                {info ? <p id='info-text' className='card-text card-information'>{info}</p> : null}
            </div>

        </div>
    )
}