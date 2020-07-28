import React, { useEffect, useContext } from "react"
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade'
import LinearProgress from '@material-ui/core/LinearProgress';

import "./styles.css"
import Header from '../../components/Header/Default/index'
import upload from "../../assets/Images/upload.svg"
import api from '../../services/api'
import ImageContext from '../../contexts/Image/index'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UploadImage = () => {

    const [form, setForm] = useState('')
    const [image, setImage] = useState('')
    const [imageView, setImageView] = useState('')
    const [loading, setLoading] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const { setImageV, setImageResearcher } = useContext(ImageContext)

    const history = useHistory()

    const { handleSubmit } = useForm();

    useEffect(() =>{
        const data_ = localStorage.getItem('@form')
        setForm(JSON.parse(data_))
    },[])

    useEffect(() => {
    
        setImageV(imageView)
  
    },[imageView, setImageV])


    const onSubmit = async (data) => {

        if(image)
            setLoading((prevLoading) => !prevLoading);
        else{
            setOpenAlert(true)
            return
        }
        const formImage = new FormData() 
        formImage.append('file', image)

        const formData = new FormData();

        formData.append('file', image);
        formData.append('id_doctor', 0);

        if(form.state)
            formData.append('state',form.state)
        if(form.city)
            formData.append('city',form.city)
        if(form.age)
            formData.append('age',form.age)
        if(form.temp)
            formData.append('temp',form.temp)
        if(form.info)
            formData.append('info',form.info)
        if(form.sex)
            formData.append('sex',form.sex)
        if(form.sat_ox)
            formData.append('sat_ox',form.sat_ox)
        
        
        const diag = await api.post('/covidAI', formImage)

        localStorage.setItem('@result', diag.data.result)

        localStorage.getItem('@isResearcher') ? formData.append('for_research', true) : console.log('')

        formData.append('result', diag.data.result)
        await api.post('/diagnoses', formData);
        //console.log(res)
        
        localStorage.setItem('@imgUrl', image)

        history.push('/view-diagnosis');
    }

    const onCancel = () => {
        history.push('/register');  
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function handleImageChange(event){
        setImage(event.target.files[0])
        setImageResearcher(event.target.files[0])

        const file = event.target.files[0];
        const data = await toBase64(file);
        setImageView(data)
    }

    return(
        <AuthUserContext.Consumer> 
            {authUser =>
                authUser ? 
                    <div >
                        <Header/>
                        <div className="container-upload">
                            <p className="container-title">Upload de imagem</p>
                            <div class='input-wrapper'>
                                <label for='input-file'>
                                    {imageView ?
                                        <img src={imageView} alt="raiox" className="image-upload" id="selected-image" width="300"/> :
                                        <img src={upload} alt="upload" className="image-upload"/> 
                                    }
                                </label>
                                <input id='input-file' name='file' type='file' accept=".dcm, .png, .jpg, .jpeg" onChange = {handleImageChange} />
                                <span id='file-name'></span>
                            </div>

                            <Fade in={loading && image} unmountOnExit>
                                <LinearProgress/>
                            </Fade>  

                            <button id='solicitar-button'type = "button" className="button" onClick={handleSubmit(onSubmit)}> Solicitar avaliação </button>
                            <button id='voltar-button'type = "button" className="button-back" onClick = {handleSubmit(onCancel)}> Voltar</button>

                            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                                <Alert severity="error" onClose={handleClose}>Você deve adicionar uma imagem!</Alert>
                            </Snackbar>
                        </div>
                    </div>
                : 
                    null
        }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UploadImage);