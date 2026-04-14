import { api } from "../api"


async function loginService(email, password){
    const response = await api.post('/funcionarios/login',{
        email: email,
        senha: password
    })

    if(response.status === 200 && response.data?.token){
        localStorage.setItem('authToken', response.data.token)
        console.log('Login realizado com sucesso')
    }

    return response
}

  function logoutService(){
    localStorage.removeItem("authToken")
  }

export { loginService, logoutService }