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

const ResearcherImages = (props) => {
    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])
    const [isAuth, setIsAuth] = useState(' ')
    const [disable, setDisable] = useState(false)

    useEffect(()=>{
        localStorage.removeItem('@form')
        localStorage.removeItem('@result')
        localStorage.setItem('@isResearcher', true)

        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           if (!!idTokenResult.claims.researcher) {
             setIsAuth(true)
           } else {
             setIsAuth(false)
           }
        })
        .catch((error) => {
          console.log(error);
        })
    })

    function printUser(auth){
        auth.getIdTokenResult()
        .then((idTokenResult) => {
           // Confirm the user is an Admin.
           if (!!idTokenResult.claims.researcher) {
             // Show admin UI.
             console.log('RES'); console.log(idTokenResult);
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
        setTimeout( ()=>
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
                    setTimeout(()=>setDisable(false), 1000)
                    //console.log(response.data.diagnoses.docs)
                }).catch(error=>{
                    console.log(error)
                })
            })()
        , 1000)

    },[currentPage])

    function handleAdd(){
        history.push('/register')
    }
    return(
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ?
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
                                    onChange={(_,value) => {
                                        value===currentPage ? setDisable(false) : setDisable(true)
                                        setCurrentPage(value)
                                    }}
                                    color='primary'
                                    disabled={disable}
                                />
                            </div>

                        </div>
                    </div>
                    : 
                        history.push('/')
            }
        </AuthUserContext.Consumer>
    )
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ResearcherImages);