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
    const width = window.innerWidth
    
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])
    const [isAuth, setIsAuth] = useState(' ')

    function handleAdd(authUser){
        history.push('/register')
    }

    // const updateWindowDimensions = () => {
    //     setDimension({ width: window.innerWidth, height: window.innerHeight });
    // }

    useEffect(()=>{
        localStorage.removeItem('@form')
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@result')

        // window.addEventListener('resize', updateWindowDimensions);
        // return () => window.removeEventListener('resize', updateWindowDimensions);
        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           // Confirm the user is an Admin.
           if (!!idTokenResult.claims.doctor) {
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
           if (!!idTokenResult.claims.doctor) {
             // Show admin UI.
             console.log('DOCTOR'); console.log(idTokenResult);
             console.log(idTokenResult.token);
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
        setTimeout( ()=>
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
                    console.log('object');
                    //console.log(response.data.diagnoses.docs)
                }).catch(error=>{
                    //window.location.reload()
                    //setReload(reload+1)
                })

            })() 
        , 2000)

    },[currentPage])

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                    
                    <div>
                        <Header/>
                        <div className= {width > 540 ? "container" : "container-responsive"}>
                            <div className= {width > 540 ? "container-navbars" : "container-navbars-responsive"}>

                                <TextField id="pesquisar-input" 
                                    label="Pesquisar" 
                                    size = "small" 
                                    variant="outlined"
                                    className="search-input" 
                                />
                                
                                <img src={searchButton} alt="search" onClick={e=>printUser(authUser)}/>
                                <br/><br/>
                                <div className= {width > 540 ? "filter": ""}>

                                    <TextField id="outlined-select-currency" 
                                        size="small" 
                                        select 
                                        label="Filtro" 
                                        className="select-filter" 
                                        variant="outlined" 
                                        value=''
                                    >
                                        {filterOptions.map((option) => (
                                            <MenuItem key={option.Filter} value={option.Filter}>
                                            {option.Filter}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>

                                <button id='novo-button' 
                                    type = "button" 
                                    className={width > 540 ? "button-add" :"button-add-responsive"}
                                    onClick = {e=>handleAdd(authUser)}
                                >Novo</button>

                            </div>

                            <div className={width > 540 ? "container-diagnosis":"container-diagnosis-responsive"}>
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
                            
                            <div className={width > 540 ?'container-pagination':'container-pagination-responsive'}>
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
                history.push('/')
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MedicalRecord);