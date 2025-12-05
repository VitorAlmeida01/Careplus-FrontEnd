import { Pencil, Trash2, User, FileText, UserCheck, Calendar, Phone } from 'lucide-react';
import './tabela.css';

export default function Tabela() {
    const funcionarios = [
        {
            id: 1,
            nome: 'Ana Silva Santos',
            email: 'ana.silva@example.com',
            documento: '123.456.789-00',
            responsavel: 'Carlos Mendes',
            dataNascimento: '15/03/2010',
            telefone: '(11) 98765-4321'
        },
        {
            id: 2,
            nome: 'Bruno Costa Lima',
            email: 'bruno.costa@example.com',
            documento: '234.567.890-11',
            responsavel: 'Maria Oliveira',
            dataNascimento: '22/07/2009',
            telefone: '(21) 97654-3210'
        },
        {
            id: 3,
            nome: 'Carla Pereira Souza',
            email: 'carla.pereira@example.com',
            documento: '345.678.901-22',
            responsavel: 'João Santos',
            dataNascimento: '08/11/2011',
            telefone: '(11) 96543-2109'
        },
        {
            id: 4,
            nome: 'Daniel Rodrigues',
            email: 'daniel.rodrigues@example.com',
            documento: '456.789.012-33',
            responsavel: 'Paula Ferreira',
            dataNascimento: '30/05/2017',
            telefone: '(31) 95432-1098'
        },
        {
            id: 5,
            nome: 'Eduarda Martins',
            email: 'eduarda.martins@example.com',
            documento: '567.890.123-44',
            responsavel: 'Roberto Alves',
            dataNascimento: '12/09/2019',
            telefone: '(41) 94321-0987'
        },
        {
            id: 6,
            nome: 'Fernando Almeida',
            email: 'fernando.almeida@example.com',
            documento: '678.901.234-55',
            responsavel: 'Juliana Costa',
            dataNascimento: '25/02/2020',
            telefone: '(51) 93210-9876'
        },
        {
            id: 7,
            nome: 'Gabriela Santos',
            email: 'gabriela.santos@example.com',
            documento: '789.012.345-66',
            responsavel: 'Marcos Silva',
            dataNascimento: '18/06/2021',
            telefone: '(61) 92109-8765'
        },
        {
            id: 8,
            nome: 'Henrique Oliveira',
            email: 'henrique.oliveira@example.com',
            documento: '890.123.456-77',
            responsavel: 'Patrícia Lima',
            dataNascimento: '03/12/2022',
            telefone: '(71) 91098-7654'
        },
        {
            id: 9,
            nome: 'Isabela Ferreira',
            email: 'isabela.ferreira@example.com',
            documento: '901.234.567-88',
            responsavel: 'Ricardo Souza',
            dataNascimento: '27/04/2020',
            telefone: '(81) 90987-6543'
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