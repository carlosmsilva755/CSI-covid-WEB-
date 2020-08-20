import React from 'react'
import './styles.css'
import { useState } from 'react'

export default ({id, date, age, sex, info, image, diagnosis,prob1, prob2, prob3, result2, result3}) => {
    const width = window.innerWidth

    const [class1, setClass1] = useState('')
    const [class2, setClass2] = useState('')
    const [class3, setClass3] = useState('')
    React.useEffect(()=>{
        diagnosis===0 || diagnosis==='0'? setClass1('green-diag') : diagnosis===1 || diagnosis==='1' ? setClass1('gray-diag') : setClass1('red-diag') 
        
        result2===0 || result2==='0' ? setClass2('green-diag') : result2===1 || result2==='1' ? setClass2('gray-diag') : setClass2('red-diag') 
                     
        result3===0 || result3==='0'? setClass3('green-diag') : result3===1 || result3==='1'? setClass3('gray-diag') : setClass3('red-diag') 
                     
    },[diagnosis, result2, result3])
    return(
        <div className={width > 540 ? "card-view" : "card-view-responsive"}>

            <div className='card-left'><br/>
                <h1 className = 'card-id'>{id}</h1>
                <p className = 'card-date'>{date}</p>
                <img src={image} alt='xray' className='card-img'/>
            </div>

            <div className ='card-right'>
            {
                localStorage.getItem('@isResearcher') || localStorage.getItem('@justUpload')?
                    <br/> : <p id ='modelo-diagnostico'className='card-model-title'>Diagnóstico do modelo:</p>
            }
                {   
                    diagnosis === '0' || diagnosis === 0 ?
                    <p id='normal-diagnostico' className='card-diagnosis green-diag'> <b>NORMAL</b></p> :
                        diagnosis === '1' || diagnosis === 1?
                            <p id='pneumonia-diagnostico' className='card-diagnosis gray-diag'> <b>PNEUMONIA</b></p>:
                            <p id='covid-diagnostico' className='card-diagnosis red-diag'> <b>COVID-19</b></p>
                }
                {localStorage.getItem('@isResearcher') || localStorage.getItem('@justUpload')?
                    null :
                    prob1 ? 
                        <>
                            <p className='card-model-title'>Nível de confiança:</p>

                            <p className={`card-text ${class1} diag-bold`}>
                                {prob1? parseFloat(prob1*100).toFixed(3):null}{diagnosis===0 || diagnosis==='0'? "% NORMAL" : diagnosis===1 || diagnosis==='1' ? "% PNEUMONIA" : "% COVID-19" }
                            </p>

                            <p className={`card-text ${class2} diag-bold`}>
                                {prob2? parseFloat(prob2*100).toFixed(3):null}{result2===0 || result2==='0' ? "% NORMAL" : result2===1 || result2==='1' ? "% PNEUMONIA" : "% COVID-19" }
                            </p>

                            <p className={`card-text ${class3} diag-bold`}>
                                {prob3? parseFloat(prob3*100).toFixed(3):null}{result3===0 || result3==='0'? "% NORMAL" : result3===1 || result3==='1'? "% PNEUMONIA" : "% COVID-19" }
                            </p>

                        </> : null
                }

                <p className='card-model-title'>Dados do paciente:</p>
                {age ? <p id='idade-text' className='card-text'>Idade: {age} anos</p> : <p id='idade-text' className='card-text'>Idade: Não informada</p>}
                {sex ? <p id='sexo-text' className='card-text'>Sexo: {sex}</p> : <p id='sexo-text' className='card-text'>Sexo: Não informado</p>}
                {info ? <p id='info-text' className='card-text'>Informações clínicas: </p> : <p id='info-text' className='card-text'>Informações clínicas: Não informado</p>}
                {info ? <p id='info-text' className='card-text card-information'>{info}</p> : null}
                <br/>
            </div>

        </div>
    )
}

/**
 * 
  <Chart 
                    width={'320px'}
                    // height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Diagnosis', 'Percentage'],
                        ['COVID-19', 33],
                        ['NORMAL', 26],
                        ['PNEUMONIA', 22],
                        
                    ]}
                    options={{
                        //sliceVisibilityThreshold: 0.2, // 20%
                        tooltip: { trigger: 'none' },
                        slices: {
                            0: { color: '#EE4937' },
                            1: { color: '#50B600' },
                            2: { color: '#A1A1A1'}
                        },
                        chartArea:{
                            left:10
                        }
                    }}
                    rootProps={{ 'data-testid': '7' }}
                /> 
 */