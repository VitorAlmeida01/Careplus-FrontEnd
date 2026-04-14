import React from "react"
import { useNavigate } from "react-router-dom"
import { logoutService } from "../../service/login/login.service"

export default function Unauthorized() {
  const navigate = useNavigate()

  function handleVoltar(){
    logoutService()
    navigate("/")
  }

  

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">401</h1>
        <p className="text-2xl text-gray-700 mb-8">
          Você não tem permissões suficientes
        </p>
        <button
          onClick={handleVoltar}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Voltar para o Login
        </button>
      </div>
    </div>
  )
}
