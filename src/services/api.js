import axios from 'axios'

let api 

if( process.env.REACT_APP_ENV === "dev"){
    api = axios.create({
        baseURL:process.env.REACT_APP_STAGING_API
    })
}else{ 
    api = axios.create({
        baseURL:process.env.REACT_APP_PRODUCTION_API
    }) 
}
export default api

/*
    https://csicovidapi.tk
    https://csi-covid-staging.herokuapp.com/
*/