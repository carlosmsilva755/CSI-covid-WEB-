import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'

import './styles.css'
import logo from '../../../assets/logo.svg'
import profile from '../../../assets/Icons/profile.svg'
import LogOut from '../../../assets/Icons/logOut'
import ProfileMenu from '../../../assets/Icons/profile'
import { withFirebase } from '../../../contexts/Firebase';

const Header = ({ firebase }) => {
    
    const history = useHistory()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleProfile = () =>{
        history.push('/profile-doc')
    }

    return (
        <header>

            <div className ="container-nav">

                <div className = "container-logo">
                    <img src={logo} alt="logo"/>
                </div>


                <div className= "container-header">

                    <div className="container-header-prontuario">                   
                        <a href = '/medicalRecord' className = "header-buttons">Diagnósticos</a>                    
                    </div>

                    {/* <div className="container-header-images">  
                    <a href = '/medicalRecord' className = "header-buttons">Imagens</a>  
                    </div> */}

                </div>                
                
                {/* <div className = "container-profile">
                    <Link to='/'>
                        <img src={profile} alt="logo" onClick={firebase.doSignOut} id='logout-button'/>
                    </Link>
                </div> */}

                <div className = "container-profile">
                    <img src={profile}
                        alt="logo" 
                        className ='img-hover'
                        onClick={handleClick} 
                        id='logout-button'
                    />
                </div>
                
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleProfile}>
                        <ProfileMenu/> &nbsp; Meu perfil
                    </MenuItem>

                    <MenuItem onClick={firebase.doSignOut}>
                        <LogOut/> &nbsp; Sair
                    </MenuItem>
                </Menu>


            </div>

        </header>
    )
}
export default withFirebase(Header)