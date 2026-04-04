import { api } from "../api";

async function listarFuncionarios(pagina){
    try{
        const response = await api.get(`/funcionarios/todos-funcionarios?pagina=${pagina}`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch (error){
        console.error(error)
    }
}


export { listarFuncionarios}


async function listarSupervisores(){
    try{
        const response = await api.get(`/funcionarios/supervisores`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }

    }catch(error){
        console.error(error)
    }
}

export {listarSupervisores}

export async function cadastrarFuncionario(formData) {
    const response = await api.post("/funcionarios", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}