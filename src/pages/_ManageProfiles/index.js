import React, { useEffect, useState, useCallback } from "react"
import {useHistory} from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Pagination from '@material-ui/lab/Pagination'

import './styles.css'
import searchButton from '../../assets/Icons/searchButton.svg'
import Card from '../../components/Cards/CardProfile/index'
import Header from '../../components/Header/Admin/index'
import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'

const ManageProfiles = (props) => {

    const filterOptions = [{"Filter":"Pendentes"}, {"Filter":"Bloqueados"}, {"Filter":"Desbloqueados"}]
    const width = window.innerWidth

    const history = useHistory()

	const [profiles, setProfiles] = useState([])
    const [isAuth, setIsAuth] = useState(' ')
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [pages, setPages] = useState(null)
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const [finalSearch, setFinalSearch] = useState('')

    const [newCall, setNewCall] = useState(1)

    useEffect(()=>{
        
        localStorage.removeItem('@isResearcher')
        localStorage.removeItem('@justUpload')
        localStorage.removeItem('@formUpdate')
        localStorage.removeItem('@form')
        localStorage.removeItem('@result')
        localStorage.removeItem('@result2')
        localStorage.removeItem('@result3')
        localStorage.removeItem('@prob1')
        localStorage.removeItem('@prob2')
        localStorage.removeItem('@prob3')

        localStorage.setItem('@isadm', true)
        
        props.firebase.auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
           if (!!idTokenResult.claims.admin) {
             setIsAuth(true)
           } else {
             setIsAuth(false)
           }
        })
        .catch((error) => {
          console.log(error);
        })
	})
    
    
    const searchProfile = useCallback( async() => {
        if(!search){
            setError(true)
            setErrorMsg('Você deve adicionar um nome')
            return
        }

        await api.get(`/users?page=${currentPage}&name=${search}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                }
            }
        ).then((response)=>{
            
            if(response.data.users.docs.length === 0){
                setError(true)
                setErrorMsg('Nenhum nome encontrado')
            }else{
                console.log(response.data.users.docs);
                
                setProfiles(response.data.users.docs)
				setCurrentPage(response.data.users.page)
				setPages(response.data.users.pages)
				setTimeout(()=>setDisable(false), 1000)
            }
            
        }).catch(error=>{
            console.log(error)
            setError(true)
            setErrorMsg('Erro ao fazer consulta')
        })
    }, [currentPage, search])

	useEffect(() => {
        if(isSearching){
            searchProfile()
        }
        else{
            (async () => {
            
                await api.get(`/users?page=${currentPage}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
                        }
                    }
                ).then(response=>{
                    console.log(response.data.users.docs)
                    setProfiles(response.data.users.docs)
                    setCurrentPage(response.data.users.page)
                    setPages(response.data.users.pages)
                    setTimeout(()=>setDisable(false), 1000)
                }).catch(error=>
                    props.firebase.auth.currentUser.getIdTokenResult()
                        .then((idTokenResult) => {
                            localStorage.setItem('@docusr_tkn',idTokenResult.token)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                )

            })()
        }
            
    }, [currentPage, isSearching, props.firebase.auth.currentUser, searchProfile, newCall])

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                    
                    <div>
                        <Header/>
                        <div className= {width > 540 ? "container" : "container-responsive"}>
						
                            <div className= {width > 540 ? "container-navbars" : "container-navbars-responsive"}>
                              	<TextField id="pesquisar-nome-input" 
                                    label={error ? errorMsg:"Pesquisar"}
                                    size = "small" 
                                    variant="outlined"
                                    className="search-input"
                                    error={error}
                                    value ={finalSearch} 
                                    onChange={event => {
                                        setFinalSearch(event.target.value)
                                        setError(false)
                                    }}
                                />
                                
                                <img id ='pesquisar-button'
                                    src={searchButton} 
                                    alt="search" 
                                    className='button-search-menu'
                                    onClick={e=>{
                                        setSearch(finalSearch)
                                        isSearching === true ? setIsSearching('verd') :
                                            setIsSearching(true)

                                        setCurrentPage(1)
                                    }}
                                />

                                <div className= {width > 540 ? "filter": ""}>

                                    <TextField id="outlined-select-currency" 
                                        size="small" 
                                        select 
                                        label="Filtro" 
                                        className="select-filter" 
                                        variant="outlined" 
                                        disabled
                                        // disabled={disableSelect}
                                        // value={filter}
                                        onChange={event=>{
                                            // setCurrentPage(1)
                                        }}
                                    >
                                        {filterOptions.map((option) => (
                                            <MenuItem key={option.Filter} value={option.Filter}>
                                            {option.Filter}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                          	</div>

							<div className='container-diagnosis-admin'>
								{
                                    profiles ?
                                        profiles.map( item =>
                                            <div className="content-card" key = {item._id}>
                                                <Card profile={item} setNewCall={setNewCall} newCall={newCall}/>
                                            </div>
                                        ) 
                                    :
                                        null
                                }
							</div>

							<div className={width > 540 ?'container-pagination':'container-pagination-responsive-adm'}>  
								<Pagination 
									count={pages}
									page={parseInt(currentPage)}
									onChange={(event,value) => {
										value===currentPage ? setDisable(false) : setDisable(true)
										setCurrentPage(value)
									}}
									color='primary'
									disabled={disable}
								/>
                            </div>

							<br/><br/>
						</div>
                    </div>

            : 
                history.push('/login')
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ManageProfiles);