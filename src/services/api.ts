import axios from 'axios';

const api = axios.create({
    baseURL: "https://bikeindex.org:443/api/v3"
})

export default api;