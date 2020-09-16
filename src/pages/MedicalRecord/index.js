import React, { useEffect, useState, useContext } from "react"
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
import ImageContext from '../../contexts/Image/index'

const MedicalRecord = (props) => {

    const filterOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}, {"Filter":"Todos"}]
    const width = window.innerWidth
    const { setImageV } = useContext(ImageContext)

    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(localStorage.getItem('@currentpage') ?
     localStorage.getItem('@currentpage'):1)
    const [pages, setPages] = useState(null)
    const [diagnoses, setDiagnoses] = useState([])
    const [isAuth, setIsAuth] = useState(' ')
    const [disable, setDisable] = useState(false)
    const [search, setSearch] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [deleteStorage, setDeleteStorage] = useState(true)

    const [filter, setFilter] = useState(localStorage.getItem('@filterNumber') ?
    localStorage.getItem('@filterNumber'):'')
    const [disableSelect, setDisableSelect] = useState(false)
    const [isFiltering, setIsFiltering] = useState(false)
    const [pagesFilter, setPagesFilter] = useState(null)
    const [currentPageFilter, setCurrentPageFilter] = useState(localStorage.getItem('@currentpageFilter') ?
    localStorage.getItem('@currentpageFilter'):1)

    function handleAdd(authUser){
        history.push('/register')
    }

    // const updateWindowDimensions = () => {
    //     setDimension({ width: window.innerWidth, height: window.innerHeight });
    // }

    useEffect(()=>{
        
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@justUpload')
        localStorage.removeItem('@formUpdate')
        if(deleteStorage){
            
            localStorage.removeItem('@form')
            localStorage.removeItem('@result')
            localStorage.removeItem('@result2')
            localStorage.removeItem('@result3')
            localStorage.removeItem('@prob1')
            localStorage.removeItem('@prob2')
            localStorage.removeItem('@prob3')
        }

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

    async function searchDiagnosis(){
        if(!search){
            setError(true)
            setErrorMsg('Você deve adicionar um ID')
            return
        }

        await api.get(`/doctor/diagnoses?page=1&id=${search}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
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
            console.log(error)
            setError(true)
            setErrorMsg('Erro ao fazer consulta')
        })
        
    }

    const filterNumber = (value) => {
        if(value === 'Covid-19')
            return 2
        if(value === 'Pneumonia')
            return 1
        if(value === 'Normal')
            return 0
    }

    useEffect(() => {
        isFiltering || localStorage.getItem('@currentpageFilter')?
            setTimeout( ()=>
                (async () => {
                    await api.get(`doctor/diagnoses?page=${currentPageFilter}&result=${filterNumber(filter)}`,
                        {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                            }
                        }
                    ).then((response)=>{
                        setDiagnoses(response.data.diagnoses.docs)
                        setCurrentPageFilter(Number(response.data.diagnoses.page))
                        setPagesFilter(response.data.diagnoses.pages)

                        setTimeout(()=>setDisableSelect(false), 1500)
                        setTimeout(()=>setDisable(false), 1000) 

                        // console.log(response.data.diagnoses.docs)   
                    }).catch(error=>{
                        console.log(error)
                    })

                })() 
            , 1000)

        : 
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
                    setTimeout(()=>setDisable(false), 1000) 
                    setTimeout(()=>setDisableSelect(false), 1500)
                    // console.log(response.data.diagnoses.docs);
                }).catch(error=>{
                    props.firebase.auth.currentUser.getIdTokenResult()
                        .then((idTokenResult) => {
                            localStorage.setItem('@docusr_tkn',idTokenResult.token)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })

            })() 
    , 1000)
    }, [currentPageFilter, isFiltering, filter, currentPage, props.firebase.auth.currentUser]);

    return (
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
                                <br/><br/>
                                <div className= {width > 540 ? "filter": ""}>

                                    <TextField id="outlined-select-currency" 
                                        size="small" 
                                        select 
                                        label="Filtro" 
                                        className="select-filter" 
                                        variant="outlined" 
                                        disabled={disableSelect}
                                        value={filter}
                                        onChange={event=>{
                                            setFilter(event.target.value)
                                            setDisableSelect(true)
                                            if(event.target.value === "Todos"){
                                                setIsFiltering(false)
                                                localStorage.removeItem('@currentpageFilter')
                                                console.log('TODOS');
                                            }
                                            else{
                                                setIsFiltering(true)
                                                localStorage.setItem('@currentpageFilter', 1)
                                            }
                                            setCurrentPageFilter(1)
                                            localStorage.setItem('@filterNumber', event.target.value)
                                        }}
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
                                {isFiltering || localStorage.getItem('@currentpageFilter')?
                                    <Pagination 
                                        count={pagesFilter}
                                        page={currentPageFilter}
                                        onChange={(event,value) => {
                                            value===currentPageFilter ? setDisable(false) : setDisable(true)
                                            setCurrentPageFilter(value)
                                            localStorage.setItem('@currentpageFilter', value)
                                        }}
                                        color='primary'
                                        disabled={disable}
                                    /> :
                                    <Pagination 
                                        count={pages}
                                        page={currentPage}
                                        onChange={(event,value) => {
                                            value===currentPage ? setDisable(false) : setDisable(true)
                                            setCurrentPage(value)
                                            localStorage.setItem('@currentpage', value)
                                        }}
                                        color='primary'
                                        disabled={disable}
                                    />}
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

export default withAuthorization(condition)(MedicalRecord);