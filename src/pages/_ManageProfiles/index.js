import React, { useEffect, useState } from "react"
import {useHistory} from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
import Pagination from '@material-ui/lab/Pagination'

import './styles.css'
import searchButton from '../../assets/Icons/searchButton.svg'
import Card from '../../components/Cards/CardProfile/index'
import Header from '../../components/Header/Admin/index'
import api from '../../services/api'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'
// import ImageContext from '../../contexts/Image/index'

const ManageProfiles = (props) => {

    // const filterOptions = [{"Filter":"Médicos"}, {"Filter":"Pesquisadores"}]
    const width = window.innerWidth

    const history = useHistory()

	const [profiles, setProfiles] = useState([])
    const [isAuth, setIsAuth] = useState(' ')
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [pages, setPages] = useState(null)
	const [disable, setDisable] = useState(false)

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
	
	useEffect(() => {

		(async () => {
		
			await api.get(`/users?page=${currentPage}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem('@docusr_tkn')}`
					}
				}
			).then(response=>{
				console.log(response);
				setProfiles(response.data.users.docs)
				setCurrentPage(response.data.users.page)
				setPages(response.data.users.pages)
				setTimeout(()=>setDisable(false), 1000)
			})

		})()
	}, [currentPage])

    return (
        <AuthUserContext.Consumer> 
            {authUser =>
                isAuth ? 
                    
                    <div>
                        <Header/>
						<div className='container'>

						
                          	<div className='container-navbar'>
                              	<TextField id="pesquisar-input" 
                                    label={"Pesquisar"}
                                    size = "small" 
                                    variant="outlined"
                                    className="search-input"
                                    value ={search} 
                                    onChange={event => {
                                        setSearch(event.target.value)
                                    }}
                                />
                                
                                <img id ='pesquisar-button'
                                    src={searchButton} 
                                    alt="search" 
                                    className='button-search-menu'
                                    // onClick={searchDiagnosis}
                                />
                          	</div>

							<div className='container-diagnosis-admin'>
								{
                                    profiles ?
                                        profiles.map( item =>
                                            <div className="content-card" key = {item._id}>
                                                <Card profile={item}/>
                                            </div>
                                        ) 
                                    :
                                        null
                                }
							</div>

							<div className={width > 540 ?'container-pagination':'container-pagination-responsive'}>  
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