import React from 'react'
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { useState, useEffect} from 'react'

import './styles.css'
import Header from '../../components/Header/Default/index'
import states from '../../utils/states-cities/estados'
import cities from '../../utils/states-cities/cities'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'

const RegisterDiagnosis = () => {

    const history = useHistory()
    const sexo = [{"sexo":"Masculino"}, {"sexo":"Feminino"}]

    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [sex,setSex] = useState('')
    const [age,setAge] = useState('')
    const [temp,setTemp] = useState('')
    const [sat_ox,setSat_ox] = useState('')
    const [info,setInfo] = useState('')
    const [citiesArray, setCitiesArray] = useState([])

    const [mount, setMount] = useState(false)

    useEffect( () =>{
        localStorage.removeItem('@currentpage')
        localStorage.removeItem('@currentpageFilter')
        localStorage.removeItem('@filterNumber')
        localStorage.removeItem('@currentpageFilterRes')
        localStorage.removeItem('@filterNumberRes')
        localStorage.removeItem('@currentpageFilterUp')
        localStorage.removeItem('@filterNumberUp')
        
        const data = localStorage.getItem('@form')
        if(data){
            const data_ = JSON.parse(data)
            setState(data_.state)
            setCity(data_.city)
            setSex(data_.sex === '' ? '' :
                data_.sex === "M" ? "Masculino" : "Feminino" 
            )
            setAge(data_.age)
            setTemp(data_.address)
            setSat_ox(data_.sat_ox)
            setTemp(data_.temp)
            setInfo(data_.info)
        }
    },[])

    function handleContinue(){

        const data = {
            state,
            city,
            "sex": sex === '' ? '' : sex === 'Masculino' ? 'M' : 'F',
            age,
            temp,
            sat_ox,
            info,
        }

        localStorage.setItem('@form',JSON.stringify(data))

        history.push('/upload')
    }
    

    function handleCancel(){
        localStorage.getItem('@isResearcher') ?
            history.push('/researcherImages') 
            : 
            localStorage.getItem('@justUpload') ? 
                history.push('/doctorUpload')
                : history.push('/medicalRecord')

        localStorage.removeItem('@form')
        localStorage.removeItem('@image')
    }

    useEffect(() => {

        let stateID
        for(let i =0 ; i < states.length ; i++){
            if(states[i].Nome === state){
                stateID = states[i].ID
                break
            }
        }

        let citiesFiltered = cities.filter(function(cities){
            return cities.Estado === stateID
        })
        setCitiesArray(citiesFiltered)

    },[state])

    useEffect(() => {
        if(!mount){

            if(localStorage.getItem('UF')){
                const UF = localStorage.getItem('UF')

                for(let i =0 ; i < states.length ; i++){
                    if(states[i].Sigla === UF){
                        setState(states[i].Nome)
                        break
                    }
                }

                const county = localStorage.getItem('county')
                setCity(county)
            }
            setMount(false)
        }
    },[mount])

    return(
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                    <div>
                        <Header/>
                        <main id ="register" className="pages">

                            <div className="container-register">
                                
                                <form onSubmit = {handleContinue}>
                                    <div className='container-form'>
                                        <h1 className="container-title">Dados do paciente</h1>

                                        <TextField 
                                            id="estado-select" 
                                            size="small" 
                                            select 
                                            label="Estado" 
                                            className="form-state" 
                                            variant="outlined" 
                                            value ={state} 
                                            onChange={event => setState(event.target.value)}
                                        >
                                            {states.map((option) => (
                                                <MenuItem key={option.Nome} value={option.Nome}>
                                                {option.Nome}
                                                </MenuItem>
                                            ))
                                            }
                                        </TextField>

                                        <br/> <br/> 
                                        
                                        <TextField 
                                            id="cidade-select" 
                                            size="small"
                                            select 
                                            label="Cidade" 
                                            className="form-state" 
                                            variant="outlined"
                                            value={city}
                                            onChange={event => setCity(event.target.value)}
                                        >
                                            {
                                                citiesArray.map((option) => (
                                                <MenuItem key={option.Nome} value={option.Nome}>
                                                {option.Nome}
                                                </MenuItem>
                                                ))
                                            }
                                        </TextField> 

                                        <br/> <br/> 

                                        <div className="container-divider">

                                            <TextField 
                                                id="sexo-select" 
                                                size="small" 
                                                select 
                                                label="Sexo" 
                                                className="form-divider-content" 
                                                variant="outlined"
                                                value={sex}
                                                onChange={event => setSex(event.target.value)}
                                            >
                                                {sexo.map((option) => (
                                                    <MenuItem key={option.sexo} value={option.sexo}>
                                                    {option.sexo}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            
                                            <div className="input-age">
                                                <TextField 
                                                    id="idade-input" 
                                                    size="small" 
                                                    label="Idade" 
                                                    type="number"
                                                    variant="outlined" 
                                                    className="form-divider-content2"
                                                    value={age}
                                                    onChange={event => setAge(event.target.value)}
                                                />
                                            </div>

                                        </div>

                                        <br/>

                                        <div className="container-divider">

                                            <TextField 
                                                id="temp-input" 
                                                size="small" 
                                                label="Temperatura (°C)" 
                                                className="form-divider-content" 
                                                variant="outlined"
                                                value={temp}
                                                onChange={event => setTemp(event.target.value)}
                                            />
                                            
                                            <div className="input-age">
                                                <TextField 
                                                    id="sat_ox-input" 
                                                    size="small" 
                                                    label="Sat. de oxigênio" 
                                                    variant="outlined" 
                                                    className="form-divider-content2"
                                                    value={sat_ox}
                                                    onChange={event => setSat_ox(event.target.value)}
                                                />
                                            </div>

                                        </div>

                                        <br/>   

                                        <TextField 
                                            id="info-select" 
                                            multiline={true} 
                                            rows = {10}
                                            label="Informações clínicas" 
                                            type="number" 
                                            variant="outlined" 
                                            className="clinical-info"
                                            value={info}
                                            onChange={event => setInfo(event.target.value)}
                                        />
                                        
                                        <br/><br/>
                                        <button id='continuar-button' type = "submit" className="button"> Continuar</button>
                                        <button id='cancelar-button'type = "button" className="button-back" onClick = {handleCancel}> Cancelar</button>
                                        <br/><br/>
                                    </div>
                                </form>

                            </div>
                        </main>
                    </div>
                : 
                    null
            }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RegisterDiagnosis);