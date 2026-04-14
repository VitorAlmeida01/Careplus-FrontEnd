import { api } from "../api"

async function fichaClinicaPorPaciente(idPaciente) {
  try {
    const response = await api.get(
      `/detalhes-pacientes/detalhes-completos?id=${idPaciente}`,
    )

    if (response.status === 200) {
      const dados = response.data
      console.log("Dados ficha clinica: ", dados)
      return dados
    }
  } catch (error) {
    console.error(error)
  }
}

async function responsavelPorId(idPaciente){
      try {
    const response = await api.get(
      `/responsaveis/${idPaciente}`,
    )

    if (response.status === 200) {
      const dados = response.data
      console.log("Dados ficha clinica: ", dados)
      return dados
    }
  } catch (error) {
    console.error(error)
  }
}

export { fichaClinicaPorPaciente, responsavelPorId }
