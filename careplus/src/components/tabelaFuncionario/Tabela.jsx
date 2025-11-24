import { Pencil, Trash2, User, FileText, UserCheck, Calendar, Phone } from 'lucide-react';
import './tabela.css';

export default function Tabela() {
    const funcionarios = [
        {
            id: 1,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
        {
            id: 2,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
        {
            id: 3,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
                {
            id: 4,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
         {
            id: 5,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
                {
            id: 5,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
        {
            id: 6,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
        {
            id: 7,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },
        {
            id: 8,
            nome: 'Vitor Almeida',
            email: 'vitor@example.com',
            documento: '212.232.212-21',
            responsavel: 'Rafael',
            dataNascimento: '01/01/2020',
            telefone: '(11) 92122-1212'
        },

    ];

    return (
        <div className='tabela-container'>
            <table className='tabela-pacientes'>
                <thead>
                    <tr>
                        <th><User size={18}/>Nome</th>
                        <th><FileText size={18} /> Documento</th>
                        <th><UserCheck size={18} />Responsavel</th>
                        <th> <Calendar size={18} />Data Nascimento</th>
                        <th> <Phone size={18} />Telefone Responsavel</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario) =>{
                        return(
                <tr key={funcionario.id}>
                    <td>
                        <div className='usuario-info'>
                            <div className='usuario-dados'>
                                <span>{funcionario.nome}</span>
                                <span>{funcionario.email}</span>
                            </div>
                        </div>
                    </td>
                    <td>{funcionario.documento}</td>
                    <td>{funcionario.responsavel}</td>
                    <td>{funcionario.dataNascimento}</td>
                    <td>{funcionario.telefone}</td>
                    <td className='botao'><Pencil size={18} /></td>
                    <td className='botao'><Trash2 size={18} /></td>

                </tr>
                        )

                    })}
                </tbody>

            </table>
        </div>
    );




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