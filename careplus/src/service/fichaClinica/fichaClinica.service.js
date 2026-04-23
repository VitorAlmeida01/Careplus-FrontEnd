import { api } from "../api"

async function fichaClinicaPorPaciente(idPaciente) {
  try {
    const response = await api.get("/detalhes-pacientes/detalhes-completo", {
      params: {
        idPaciente,
      },
    })

    if (response.status === 200) {
      const dados = response.data
      console.log("Dados ficha clinica: ", dados)
      return dados
    }
  } catch (error) {
    console.error(error)
  }
}

async function contatoCuidadorPorPaciente(idPaciente){
      try {
    const response = await api.get(
      "/cuidadores/contato",
      { params: { idPaciente } },
    )

    if (response.status === 200) {
      const dados = response.data
      console.log("Dados ficha clinica: ", dados)
      return dados
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Compatibilidade temporaria com chamadas existentes
async function responsavelPorId(idPaciente) {
  return contatoCuidadorPorPaciente(idPaciente)
}

async function adicionarCid({ cid, idProntuario }) {
  try {
    const response = await api.post("/classificacao-doencas", {
      cid,
      idProntuario,
    })

    if (response.status === 200 || response.status === 201) {
      return response.data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function removerCid(idCid) {
  try {
    const response = await api.delete("/classificacao-doencas", {
      params: { id: idCid },
    })

    if (response.status === 200 || response.status === 204) {
      return true
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function adicionarMedicacao({
  nomeMedicacao,
  dataInicio,
  dataFim,
  ativo,
  idProntuario,
}) {
  try {
    const response = await api.post("/medicacoes", {
      nomeMedicacao,
      dataInicio,
      dataFim,
      ativo,
      idProntuario,
    })

    if (response.status === 200 || response.status === 201) {
      return response.data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function atualizarMedicacao(
  idMedicacao,
  { nomeMedicacao, dataInicio, dataFim, ativo, idProntuario },
) {
  try {
    const response = await api.put("/medicacoes", {
      nomeMedicacao,
      dataInicio,
      dataFim,
      ativo,
      idProntuario,
    }, {
      params: { id: idMedicacao },
    })

    if (response.status === 200 || response.status === 204) {
      return response.data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function removerMedicacao(idMedicacao) {
  try {
    const response = await api.delete("/medicacoes", {
      params: { id: idMedicacao },
    })

    if (response.status === 200 || response.status === 204) {
      return true
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function atualizarFichaClinica(idFicha, dadosFicha) {
  try {
    const response = await api.put("/fichas-clinicas", dadosFicha, {
      params: { id: idFicha },
    })

    if (response.status === 200 || response.status === 204) {
      return response.data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function proximaConsultaPorPaciente(idPaciente) {
  try {
    const response = await api.get("/consultas-prontuario/proxima", {
      params: { idPaciente },
    })

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function detalhesConsultaPorId(idConsulta) {
  try {
    const response = await api.get("/consultas-prontuario/detalhes", {
      params: { idConsulta },
    })

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  fichaClinicaPorPaciente,
  contatoCuidadorPorPaciente,
  responsavelPorId,
  adicionarCid,
  removerCid,
  adicionarMedicacao,
  atualizarMedicacao,
  removerMedicacao,
  atualizarFichaClinica,
  proximaConsultaPorPaciente,
  detalhesConsultaPorId,
}
