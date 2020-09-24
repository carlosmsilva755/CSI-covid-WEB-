import React, { useState, useEffect } from 'react'
import { useLocation, useHistory} from 'react-router-dom'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import './styles.css'
import logo from '../../../assets/logo.svg'
import profile from '../../../assets/Icons/Header/adm.svg'
import LogOut from '../../../assets/Icons/logOut'
import ProfileMenu from '../../../assets/Icons/profile'
// import Assignment from '../../../assets/Icons/assignment'
import { withFirebase } from '../../../contexts/Firebase';
import { ReactComponent as MenuIcon } from '../../../assets/Icons/menu.svg'

const Header = ({ firebase }) => {

    const { width } = { width: window.innerWidth, height: window.innerHeight };
    const [dropMenuOpen, setDropMenuOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const location = useLocation()
    const history = useHistory()

    // const updateWindowDimensions = () => {
    //     setDimension({ width: window.innerWidth, height: window.innerHeight });
    // }

    useEffect(() => {
        // console.log(width)
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)

        width < 540 ? 
        setDropMenuOpen(true) :
        console.log('not responsive')
    }

    const handleClose = () => {
        setAnchorEl(null);
        width < 540 ? 
        setDropMenuOpen(false) :
        console.log('not responsive')
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setAnchorEl(null)
    }

    const handleProfile = () =>{
        history.push('/profile-admin')
    }

    const handleLogout = () => {
        firebase.doSignOut()
    }

    return (
        <header>

            <div className ="container-nav-admin">

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>


                { width > 540 ?
                    <> 
                        <div className= "container-header-admin">

                            <div className='container-header-buttons-admin'>                   
                                <a 
                                    id='manage-profiles-button'
                                    href = '/admin-profiles' 
                                    className = {location.pathname ==='/admin-profiles' ?
                                     "header-buttons-clicked" : "header-buttons-doc"
                                    }
                                >Gestão de usuários</a>
                            </div>

                        </div>

                        <div className='container-profile-admin'>
                            <p className='header-identification-admin' id='pesquisador-perfil'>Admin</p> 

                            <div className = "container-profile">
                                <img src={profile}
                                    alt="logo" 
                                    className ='img-hover'
                                    onClick={handleClick} 
                                    id='logout-button'
                                />
                            </div>
                        </div>
                        
                    </>
                :
                    <div
                        id='menu-button'
                        className={ dropMenuOpen ?  'menu-button-active' : 'menu-button' }
                        onClick={handleClick}
                    >
                        <MenuIcon className='menu-icon'/>
                    </div>
                }
                
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {/* {
                        width < 540 && location.pathname !== '/researcherImages'?
                            <MenuItem id='diagnostico-button' onClick={handleDiagnoses}>
                                <Assignment/> &nbsp; Curadoria
                            </MenuItem>
                            : null
                    } */}

                    {
                        location.pathname !== '/profile-admin'?
                            <MenuItem id='perfil-button' onClick={handleProfile}>
                                <ProfileMenu/> &nbsp; Meu perfil
                            </MenuItem>
                            :
                            null
                    }

                    <MenuItem id='sair-button' onClick={()=> setShowModal(true)}>
                        <LogOut/> &nbsp; Sair
                    </MenuItem>
                    
                </Menu>

                <Dialog
                    open={showModal} 
                    //onClose={handleClose}
                    aria-labelledby="draggable-dialog-title" maxWidth='xs'
                    //className={classes.box}
                >
                    <DialogTitle >Deseja sair do sistema?</DialogTitle>
                    <DialogActions>
                        <button id='cancelar-button'onClick={handleCloseModal} className='button-back'>Cancelar</button>
                        <button id='saida-button'onClick={handleLogout} className='button button-modal'>Sair</button>
                    </DialogActions>
                </Dialog>

            </div>

        </header>
    )
}
export default withFirebase(Header)