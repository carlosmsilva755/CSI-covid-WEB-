import React, { useEffect, useState, useContext } from "react"
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
import ImageContext from '../../contexts/Image/index'

const ResearcherImages = (props) => {

    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]
    const history = useHistory()
    const width = window.innerWidth
    const { setImageV } = useContext(ImageContext)

    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])
    const [isAuth, setIsAuth] = useState(' ')
    const [disable, setDisable] = useState(false)
    const [search, setSearch] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [deleteStorage, setDeleteStorage] = useState(true)

    useEffect(()=>{
        
        localStorage.removeItem('@justUpload')
        localStorage.setItem('@isResearcher', true)

        if(deleteStorage){
            localStorage.removeItem('@form')
            localStorage.removeItem('@result')
        }

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

    async function searchDiagnosis(){
        if(!search){
            setError(true)
            setErrorMsg('Você deve adicionar um ID')
            return
        }

        await api.get(`/researcher/diagnoses?page=1&id=${search}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@resUsrTkn')}`
                }
            }
        ).then((response)=>{
            
            if(response.data.diagnoses.docs.length === 0){
                setError(true)
                setErrorMsg('ID inválido')
            }else{
                setDeleteStorage(false)
                console.log(response);
                const data = {
                    "state":response.data.diagnoses.docs[0].state,
                    "city":response.data.diagnoses.docs[0].city,
                    "age":response.data.diagnoses.docs[0].age,
                    "temp":response.data.diagnoses.docs[0].temp,
                    "sat_ox":response.data.diagnoses.docs[0].sat_ox,
                    "info":response.data.diagnoses.docs[0].info,
                    "fromHome":true,
                    "result":response.data.diagnoses.docs[0].result,
                    "date":response.data.diagnoses.docs[0].createdAt,
                    "_id":response.data.diagnoses.docs[0].id_doctor ? 
                        response.data.diagnoses.docs[0].id_doctor : response.data.diagnoses.docs[0].id_researcher
                }
                if(response.data.diagnoses.docs[0].sex){
                    data.sex = response.data.diagnoses.docs[0].sex === 'F'? 
                        'Feminino' : response.data.diagnoses.docs[0].sex === 'M' ? 'Masculino' : 'Feminino'
                }
        
                localStorage.setItem('@form',JSON.stringify(data))
                localStorage.setItem('@result',response.data.diagnoses.docs[0].result)
                if(response.data.diagnoses.docs[0].prob1) {
                    localStorage.setItem('@result2', response.data.diagnoses.docs[0].result2)
                    localStorage.setItem('@result3', response.data.diagnoses.docs[0].result3)
                    localStorage.setItem('@prob1',response.data.diagnoses.docs[0].prob1)
                    localStorage.setItem('@prob2',response.data.diagnoses.docs[0].prob2)
                    localStorage.setItem('@prob3',response.data.diagnoses.docs[0].prob3)
                }
                setImageV(response.data.diagnoses.docs[0].image.url)
                history.push('/view-diagnosis')
            }
            
        }).catch(error=>{
            console.log(error.response.data)
            setError(true)
            setErrorMsg('Erro ao fazer consulta')
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
                    props.firebase.auth.currentUser.getIdTokenResult()
                        .then((idTokenResult) => {
                            localStorage.setItem('@resUsrTkn',idTokenResult.token)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
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
                        <div className= {width > 540 ? "container" : "container-responsive"}>
                            <div className= {width > 540 ? "container-navbars" : "container-navbars-responsive"}>

                                <TextField id="pesquisar-input" 
                                    label={error ? errorMsg:"Pesquisar"}
                                    size = "small" 
                                    variant="outlined"
                                    className="search-input"
                                    error={error}
                                    value ={search} 
                                    onChange={event => {
                                        setSearch(event.target.value)
                                        setError(false)
                                    }}
                                />
                                
                                <img id ='pesquisar-button'
                                    src={searchButton} 
                                    alt="search" 
                                    className='button-search-menu'
                                    onClick={searchDiagnosis}
                                />
                                <div className= {width > 540 ? "filter": ""}>

                                    <TextField id="outlined-select-currency" size="small" select label="Filtro" className="select-filter" variant="outlined">
                                        {filterOptions.map((option) => (
                                            <MenuItem key={option.Filter} value={option.Filter}>
                                            {option.Filter}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>

                                <button 
                                    id ='novo-button' 
                                    type = "button" 
                                    className={width > 540 ? "button-add" :"button-add-responsive"}
                                    onClick = {handleAdd}
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
                        history.push('/login')
            }
        </AuthUserContext.Consumer>
    )
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ResearcherImages);