import React, { useEffect, useContext } from "react"
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade'
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import "./styles.css"
import Header from '../../components/Header/Default/index'
import upload from "../../assets/Images/upload.svg"
import api from '../../services/api'
import ImageContext from '../../contexts/Image/index'
import { AuthUserContext, withAuthorization } from '../../contexts/Session'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UploadImage = (props) => {

    // const [form, setForm] = useState('')
    const [image, setImage] = useState('')
    const [imageView, setImageView] = useState('')
    const [loading, setLoading] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [token, setToken] = useState('')
    const [disable, setDisable] = useState(false)
    const [result, setResult] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const resultOptions = [{"Filter":"Covid-19"}, {"Filter":"Pneumonia"}, {"Filter":"Normal"}]


    const { setImageV, setImageResearcher } = useContext(ImageContext)

    const history = useHistory()

    const { handleSubmit } = useForm();

    useEffect(() =>{
        // const data_ = localStorage.getItem('@form')
        // setForm(JSON.parse(data_))

        props.firebase.auth.currentUser.getIdToken(false)
        .then((token) => setToken(token))
        .catch(errorMessage => console.log("Auth token retrieval error: " + errorMessage));
    },[props.firebase.auth.currentUser])

    useEffect(() => {
    
        setImageV(imageView)
  
    },[imageView, setImageV])


    const onSubmit = async () => {

        if(localStorage.getItem('@isResearcher') || localStorage.getItem('@justUpload')){
            if(image && result)
                setLoading((prevLoading) => !prevLoading);
            else{
                image ? 
                    setAlertMessage('Você deve adicionar um resultado!') : 
                    setAlertMessage('Você deve adicionar uma imagem!')

                setOpenAlert(true)
                return
            }
        }else{
            if(image)
                setLoading((prevLoading) => !prevLoading);
            else{
                setAlertMessage('Você deve adicionar uma imagem!')
                setOpenAlert(true)
                return
            }
        }
        
        setDisable(true)

        const formImage = new FormData() 
        formImage.append('file', image)

        const config = {
            headers: { authorization: `Bearer ${token}` }
        };
        
        
        await api.post('/xray', 
            formImage,
            config
        ).then(async function(response){
            //essa imagem nao é raio x ou nao esta com uma boa qualidade
            if(localStorage.getItem('@isResearcher') || localStorage.getItem('@justUpload')){

                localStorage.setItem('@result', handleResultNumber())
                localStorage.setItem('@resUp', handleResultNumber())
                history.push('/view-diagnosis')
    
            }else{
                await api.post('/covidAI',
                    formImage, 
                    config
                ).then(response=>{
                    //console.log(response)
    
                    localStorage.setItem('@result', response.data.result)
                    localStorage.setItem('@result2', response.data.result2)
                    localStorage.setItem('@result3', response.data.result3)
                    localStorage.setItem('@prob1',response.data.prob1)
                    localStorage.setItem('@prob2',response.data.prob2)
                    localStorage.setItem('@prob3',response.data.prob3)
                    
                    history.push('/view-diagnosis')
                }).catch(error=>{
                    console.log(error)
                    //history.push('/login')
                    setDisable(false)
                })
    
            }

        }).catch(error=>{
            setDisable(false)
            setLoading((prevLoading) => !prevLoading)

            setAlertMessage('Essa imagem não é um Raio X ou não tem uma boa qualidade')
            setOpenAlert(true)
        })
        
    }

    function handleResultNumber(){
        if(result === "Covid-19")
            return 2
        if(result === "Pneumonia")
            return 1
        if(result === "Normal")
            return 0
    }

    const onCancel = () => {
        history.push('/register');  
    }
    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //   return;
        // }
    
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

                            {
                                localStorage.getItem('@justUpload') || localStorage.getItem('@isResearcher')? 
                                    <>
                                    <br/>
                                        <TextField id="outlined-select-currency" 
                                            size="small" 
                                            select 
                                            label="Diagnóstico"
                                            className="form-state" 
                                            variant="outlined" 
                                            value={result}
                                            onChange={event => setResult(event.target.value)}
                                        >
                                            {resultOptions.map((option) => (
                                                <MenuItem key={option.Filter} value={option.Filter}>
                                                {option.Filter}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <br/>
                                    </>
                                    : null
                            }

                            <Fade in={loading && image} unmountOnExit>
                                <LinearProgress/>
                            </Fade>  

                            <button 
                                id='solicitar-button'
                                type = "button" 
                                className="button" 
                                onClick={handleSubmit(onSubmit)}
                                disabled={disable}
                            > {localStorage.getItem('@justUpload') || localStorage.getItem('@isResearcher')? 'Fazer upload': 'Solicitar diagnóstico'} </button>
                            
                            <button 
                                id='voltar-button'
                                type = "button" 
                                className="button-back" 
                                onClick = {handleSubmit(onCancel)}
                                disabled={disable}
                            > Voltar</button>

                            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                                <Alert 
                                    severity="error" 
                                    onClose={handleClose}
                                >{alertMessage}</Alert>
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