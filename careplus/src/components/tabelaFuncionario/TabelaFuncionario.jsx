import {
  Pencil,
  Trash2,
  User,
  FileText,
  UserCheck,
  Calendar,
  Phone,
} from "lucide-react"

export default function TabelaFuncionario({ funcionarioss}) {
  return (
    <div className="bg-white w-[90%] min-h-[500px] my-[1%] mx-[4%] shadow-md rounded-lg">
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
              Supervisor
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <Calendar size={18} className="inline align-middle mr-2" />
              Cargo
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle">
              <Phone size={18} className="inline align-middle mr-2" />
              Telefone
            </th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle"></th>
            <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-gray-600 text-sm align-middle"></th>
          </tr>
        </thead>
        <tbody>
          {funcionarioss && funcionarioss.map((funcionario) => {
            return (
              <tr key={funcionario.id}>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  <div>
                    <div className="flex flex-col text-left">
                      <span>{funcionario.nome}</span>
                      <span className="text-gray-600 text-[13px]">
                        {funcionario.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {funcionario.documento || '-'}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {funcionario.supervisor ? funcionario.supervisor.nome : '-'}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {funcionario.cargo || '-'}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500">
                  {funcionario.telefone || '-'}
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer">
                  <Pencil size={18} />
                </td>
                <td className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer">
                  <Trash2 size={18} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  //         <div className="tabela-container">
  //     <table className="tabela-pacientes">
  //         <thead>
  //             <tr>
  //                 <th><User size={18} /> Nome</th>
  //                 <th><FileText size={18} /> Documento</th>
  //                 <th><UserCheck size={18} /> Responsável</th>
  //                 <th><Calendar size={18} /> Data Nascimento</th>
  //                 <th><Phone size={18} /> Telefone Responsável</th>
  //                 <th></th>
  //             </tr>
  //         </thead>
  //         <tbody>
  //             {pacientes.map((paciente) => (
  //                 <tr key={paciente.id}>
  //                     <td>
  //                         <div className="usuario-info">
  //                             <div className="avatar">
  //                                 <User size={24} />
  //                             </div>
  //                             <div className="usuario-dados">
  //                                 <span className="nome">{paciente.nome}</span>
  //                                 <span className="email">{paciente.email}</span>
  //                             </div>
  //                         </div>
  //                     </td>
  //                     <td>{paciente.documento}</td>
  //                     <td>{paciente.responsavel}</td>
  //                     <td>{paciente.dataNascimento}</td>
  //                     <td>{paciente.telefone}</td>
  //                     <td>
  //                         <div className="acoes">
  //                             <button className="btn-editar">
  //                                 <Pencil size={18} />
  //                             </button>
  //                             <button className="btn-deletar">
  //                                 <Trash2 size={18} />
  //                             </button>
  //                         </div>
  //                     </td>
  //                 </tr>
  //             ))}
  //         </tbody>
  //     </table>
  //     <div className="paginacao">
  //         <span>1-8 de 32</span>
  //         <div className="paginacao-botoes">
  //             <button>&lt;</button>
  //             <button>&gt;</button>
  //         </div>
  //     </div>
  // </div>
}
