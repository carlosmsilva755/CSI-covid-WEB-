import React, { useEffect, useState } from "react"
import {useHistory} from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Pagination from '@material-ui/lab/Pagination'

import './styles.css';
import Header from '../../components/Header/Researcher/index'
import Card from '../../components/Cards/CardMenu/index'
import searchButton from '../../assets/Icons/searchButton.svg'
import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'

const ResearcherImages = () => {
    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])

    useEffect(()=>{
        localStorage.removeItem('@form')
        localStorage.removeItem('@result')
        localStorage.setItem('@isResearcher', true)
    },[])

    function printUser(auth){
        auth.getIdTokenResult()
        .then((idTokenResult) => {
           // Confirm the user is an Admin.
           if (!!idTokenResult.claims.researcher) {
             // Show admin UI.
             console.log('RES'); //console.log(idTokenResult);
           } else {
             // Show regular user UI.
             //console.log(idTokenResult);
           }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    useEffect(()=>{
        
        (async () => {
            await api.get(`/researcher/diagnoses?page=${currentPage}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('@resUsrTkn')}`
                    }
                }
            ).then((response)=>{
                setDiagnoses(response.data.diagnoses.docs)
                setCurrentPage(Number(response.data.diagnoses.page))
                setPages(response.data.diagnoses.pages)

                console.log(response.data.diagnoses.docs)
            })
        })()

    },[currentPage])

    function handleAdd(){
        history.push('/register')
    }
    return(
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

                                <button id ='novo-button' type = "button" className="button-add" onClick = {handleAdd}>Novo</button>

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

export default withAuthorization(condition)(ResearcherImages);