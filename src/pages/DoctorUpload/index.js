import React, { useState, useEffect } from 'react'
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

const DoctorUpload = (props) => { 
    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]
    const width = window.innerWidth
    
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])
    const [isAuth, setIsAuth] = useState(' ')
    const [disable, setDisable] = useState(false)

    function handleAdd(){
        history.push('/register')
    }

    useEffect(()=>{
        localStorage.removeItem('@form')
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@result')
        
        localStorage.setItem('@justUpload',true)

        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
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

    useEffect(()=>{

        setTimeout( ()=>
            (async () => {
                await api.get(`/doctor/diagnoses/AI?page=${currentPage}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                        }
                    }
                ).then((response)=>{
                    setDiagnoses(response.data.diagnoses.docs)
                    setCurrentPage(Number(response.data.diagnoses.page))
                    setPages(response.data.diagnoses.pages)
                    console.log(response.data.diagnoses.docs);
                    setTimeout(()=>setDisable(false), 1000)
                }).catch(error=>{
                    console.log(error)
                })

            })() 
        , 1000)
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
                                
                                <img src={searchButton} alt="search"/>
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
                            {/* <p>*Aqui aparecem as imagens cedidas para o treinamento da Inteligência Artificial</p> */}

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
                                    onChange={(event,value) => {
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
                history.push('/login')
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DoctorUpload);