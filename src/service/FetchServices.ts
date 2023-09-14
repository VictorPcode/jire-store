import axios from 'axios';

const axiosAPI = axios.create({
   
    baseURL: 'https://fakestoreapi.com/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

axiosAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        throw error
    }
    )

export default axiosAPI;

    