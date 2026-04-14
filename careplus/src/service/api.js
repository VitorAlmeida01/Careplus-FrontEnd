import axios from "axios"

// const apiBaseUrl = (import.meta.env.VITE_ENDERECO_API || "/api").replace(/\/$/, "")

const api = axios.create({
    baseURL: "/api"
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { api }