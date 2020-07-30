import React, { useEffect, useState } from "react"
import {useHistory} from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Pagination from '@material-ui/lab/Pagination'

import './styles.css'
import searchButton from '../../assets/Icons/searchButton.svg'
import Card from '../../components/Cards/CardMenu/index'
import Header from '../../components/Header/Doctor/index'
import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'

const MedicalRecord = (props) => {

    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])
    const [reload, setReload] = useState(1)

    function handleAdd(authUser){
        history.push('/register')
    }
    useEffect(()=>{
        localStorage.removeItem('@form')
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@result')
    })
    useEffect(()=>{
        if(reload===1){
            window.location.reload()
            setReload(2)
        }
    }, [reload])

    function printUser(auth){
        auth.getIdTokenResult()
        .then((idTokenResult) => {
           // Confirm the user is an Admin.
           if (!!idTokenResult.claims.doctor) {
             // Show admin UI.
             console.log('DOCTOR'); console.log(idTokenResult);
           } else {
             // Show regular user UI.
             //console.log(idTokenResult);
             console.log(idTokenResult.token === localStorage.getItem('@docusr_tkn'));
           }
        })
        .catch((error) => {
          console.log(error);
        })
        //console.log(auth.getIdTokenResult())
    }

    useEffect(()=>{
        //setToken(localStorage.getItem('@docusr_tkn'))
        //console.log(localStorage.getItem('@docusr_tkn'));
        (async () => {
            await api.get(`/doctor/diagnoses?page=${currentPage}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                    }
                }
            ).then((response)=>{
                setDiagnoses(response.data.diagnoses.docs)
                setCurrentPage(Number(response.data.diagnoses.page))
                setPages(response.data.diagnoses.pages)

                //console.log(response.data.diagnoses.docs)
            }).catch(error=>{
                //window.location.reload()
                setReload(reload+1)
            })

        })()

    },[currentPage, reload])

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                    
                    <div>
                        <Header/>
                        <div className= "container">
                            <div className= "container-navbars">

                                <TextField id="outlined-basic" label="Pesquisar" size = "small" variant="outlined"className="search-input" />
                                
                                <img src={searchButton} alt="search" onClick={e=>printUser(authUser)}/>
                                
                                <div className="filter">

                                    <TextField id="outlined-select-currency" size="small" select label="Filtro" className="select-filter" variant="outlined" value=''>
                                        {filterOptions.map((option) => (
                                            <MenuItem key={option.Filter} value={option.Filter}>
                                            {option.Filter}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>

                                <button id='novo-button' type = "button" className="button-add" onClick = {e=>handleAdd(authUser)}>Novo</button>

                            </div>

                            <div className="container-diagnosis">
                                {
                                    diagnoses ?
                                        diagnoses.map( item =>
                                            <div className="content-card" key = {item._id}>
                                                <Card diagnosis={item}/>
                                            </div>
                                        ) 
                                        :
                                        null
                                }
                            </div> <br/>
                            
                            <div className='container-pagination'>
                                <Pagination 
                                    count={pages}
                                    page={currentPage}
                                    onChange={(_,value) => setCurrentPage(value)}
                                    color='primary'
                                />
                            </div>

                        </div>
                    </div>

            : 
                null
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MedicalRecord);