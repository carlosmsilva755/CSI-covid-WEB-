import axios from 'axios'

const api = axios.create({
    baseURL:'https://csi-covid-staging.herokuapp.com/'
})
//http://52.91.154.10:3000/
//https://csi-covid-staging.herokuapp.com/
export default api