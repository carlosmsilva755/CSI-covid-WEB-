import axios from 'axios'

const api = axios.create({
    baseURL:'https://csi-covid-staging.herokuapp.com/'
})
//http://ec2-18-230-111-231.sa-east-1.compute.amazonaws.com/
export default api