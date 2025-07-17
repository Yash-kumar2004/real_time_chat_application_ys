import axios from 'axios'

const axiosInstance=axios.create(
    {   baseURL:"http://localhost:3000/api",
        Credential:true
    }
)


export default axiosInstance