import React, { useState, useEffect } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory, useLocation } from 'react-router-dom'

import './styles.css'
import logo from '../../../assets/logo.svg'
import profile from '../../../assets/Icons/profile.svg'
import LogOut from '../../../assets/Icons/logOut'
import ProfileMenu from '../../../assets/Icons/profile'
import Assignment from '../../../assets/Icons/assignment'
import { withFirebase } from '../../../contexts/Firebase';
import { ReactComponent as MenuIcon } from '../../../assets/Icons/menu.svg'

const Header = ({ firebase }) => {

    const { width } = { width: window.innerWidth, height: window.innerHeight };
    const [dropMenuOpen, setDropMenuOpen] = useState(false)

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

    const handleProfile = () =>{
        history.push('/profile-res')
    }

    const handleDiagnoses = () => {
        history.push('/researcherImages')
    }

    return (
        <header>

            <div className ={width > 540 ? "container-nav" : "container-nav-responsive"}>

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>


                { width > 540 ?
                    <> 
                        <div className= "container-header">

                            <div className="container-header-prontuario">                   
                                <a href = '/researcherImages' className = "header-buttons">Imagens</a>                    
                            </div>

                        </div>                
                        
                        <div className = "container-profile">
                            <img src={profile}
                                alt="logo" 
                                className ='img-hover'
                                onClick={handleClick} 
                                id='logout-button'
                            />
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
                    {
                        width < 540 && location.pathname !== '/researcherImages'?
                            <MenuItem id='diagnostico-button' onClick={handleDiagnoses}>
                                <Assignment/> &nbsp; Imagens
                            </MenuItem>
                            : null
                    }

                    {
                        location.pathname !== '/profile-res'?
                            <MenuItem id='perfil-button' onClick={handleProfile}>
                                <ProfileMenu/> &nbsp; Meu perfil
                            </MenuItem>
                            :
                            null
                    }

                    <MenuItem id='sair-button' onClick={firebase.doSignOut}>
                        <LogOut/> &nbsp; Sair
                    </MenuItem>
                    
                </Menu>

            </div>

        </header>
    )
}
export default withFirebase(Header)