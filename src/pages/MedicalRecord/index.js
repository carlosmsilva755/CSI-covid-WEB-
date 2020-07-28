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

const MedicalRecord = () => {

    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])

    function handleAdd(){
        history.push('/register')
    }
    useEffect(()=>{
        localStorage.removeItem('@form')
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@result')
    },[])

    function printUser(auth){
        auth.getIdTokenResult()
        .then((idTokenResult) => {
           // Confirm the user is an Admin.
           if (!!idTokenResult.claims.admin) {
             // Show admin UI.
             console.log('ADMIN'); console.log(idTokenResult);
           } else {
             // Show regular user UI.
             console.log(idTokenResult);
           }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    useEffect(()=>{
        
        (async () => {
            const { data } = await api.get(`/doctor/diagnoses?page=${currentPage}`)
            setDiagnoses(data.diagnoses.docs)
      
            setCurrentPage(Number(data.diagnoses.page))
            setPages(data.diagnoses.pages)
            //console.log(data.diagnoses.docs)
        })()

    },[currentPage])

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

                                    <TextField id="outlined-select-currency" size="small" select label="Filtro" className="select-filter" variant="outlined">
                                        {filterOptions.map((option) => (
                                            <MenuItem key={option.Filter} value={option.Filter}>
                                            {option.Filter}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>

                                <button id='novo-button' type = "button" className="button-add" onClick = {handleAdd}>Novo</button>

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