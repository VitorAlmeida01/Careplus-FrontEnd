import {
  Pencil,
  Trash2,
  User,
  FileText,
  UserCheck,
  Calendar,
  Phone,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"

export default function TabelaPaciente({pacientes}) {
  const navigate = useNavigate()

  const [pacientesData, setPacientesData] = useState(pacientes)

  useEffect(() => {
    setPacientesData(pacientes)
  }, [pacientes])

  return (
    <div className="bg-white w-[90%] min-h-[700px] max-h-[700px] my-[1%] mx-[4%] shadow-md rounded-lg">
      <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <User size={18} className="inline align-middle mr-2" />
              Nome
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <FileText size={18} className="inline align-middle mr-2" />{" "}
              Documento
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <UserCheck size={18} className="inline align-middle mr-2" />
              Convênio
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <Calendar size={18} className="inline align-middle mr-2" />
              Data Nascimento
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <Phone size={18} className="inline align-middle mr-2" />
              Telefone Responsável
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle"></th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle"></th>
          </tr>
        </thead>
        <tbody>
          {pacientesData.map((paciente) => {
            return (
              <tr key={paciente.id}>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  <div>
                    <div className="flex flex-col text-left">
                      <span>{paciente.nome}</span>
                      <span className="text-gray-600 text-[13px]">
                        {paciente.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {paciente.cpf}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {paciente.convenio || "-"}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {paciente.dtNascimento}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {paciente.telefone}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer hover:text-blue-500" onClick={() => navigate(`/pacientes/ficha-clinica`)}>
                  <Pencil size={18} />
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer hover:text-red-500" >
                  <Trash2 size={18} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
