# CarePlus — Frontend

Interface web do sistema CarePlus, desenvolvida em React para gerenciamento de clínicas especializadas no atendimento de pacientes com TEA (Transtorno do Espectro Autista).

---

## Sobre o Projeto

O frontend do CarePlus oferece uma interface completa para três perfis de usuário distintos: profissionais de saúde (psicólogos, fonoaudiólogos, etc.), equipe de agendamento e administradores. Cada perfil acessa funcionalidades específicas como agenda, fichas clínicas, controle de consultas e gestão de pacientes.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Biblioteca de UI |
| React Router DOM | 7 | Roteamento e navegação |
| Vite | 7 | Build tool e servidor de desenvolvimento |
| TailwindCSS | 4 | Estilização utilitária |
| Axios | 1.5 | Requisições HTTP |
| React Toastify | 11 | Notificações |
| React Modal | 3.16 | Modais acessíveis |
| JWT Decode | 4 | Leitura do token de autenticação |
| Lucide React | — | Ícones |
| ECharts + echarts-for-react | 6 | Gráficos e visualizações |
| Shadcn UI | — | Componentes de base |
| ESLint | 9 | Qualidade de código |

---

## Estrutura de Pastas

```
src/
├── components/
│   ├── agendamento/        # Calendário (mês, semana, dia), filtros e header
│   ├── modalConsulta/      # Modais de detalhes, edição e início de consulta
│   ├── modalFichaClinica/  # Modais de ficha clínica, medicações e próxima consulta
│   ├── layout/             # Layout base com sidebar
│   ├── sidebar/            # Navegação lateral com menu por perfil
│   ├── cardPerfil/         # Card de perfil do paciente
│   └── Paginacao/          # Componente de paginação reutilizável
├── pages/
│   ├── login/              # Tela de login
│   ├── telaDashboard/      # Dashboard com visão geral
│   ├── agendamento/        # Página de agenda com calendário
│   ├── pacientes/          # Listagem de pacientes
│   ├── cadastroPaciente/   # Cadastro e edição de pacientes
│   ├── fichaClinica/       # Ficha clínica completa do paciente
│   ├── consultaAtual/      # Tela de anotações da consulta em andamento
│   ├── consultasAntigas/   # Histórico de consultas concluídas
│   └── funcionarios/       # Gestão de profissionais
├── service/
│   ├── agendamento/        # Serviços de agenda e consultas
│   ├── fichaClinica/       # Serviços de ficha clínica, medicações e consultas
│   ├── login/              # Autenticação, decodificação JWT e redirecionamento
│   ├── pacientes/          # Serviços de pacientes
│   └── funcionarios/       # Serviços de funcionários
├── routes/
│   ├── routes.jsx          # Definição das rotas e proteção por perfil
│   └── PrivateRoute.jsx    # Guard de rota baseado em roles do JWT
└── config/
    └── menuConfig.js       # Itens do menu lateral por perfil de usuário
```

---

## Perfis de Usuário

A aplicação identifica o perfil pelo campo `roles` dentro do JWT armazenado no `localStorage`:

| Role | Perfil | Acesso |
|---|---|---|
| `USER` | Profissional | Agenda própria, ficha clínica, iniciar e concluir consultas |
| `ADMIN` | Administrador | Acesso total, gestão de funcionários, edição e exclusão de consultas |
| `SCHEDULER` | Agendamento | Criação e edição de consultas no calendário |

O componente `PrivateRoute` intercepta cada rota e valida se o role do usuário logado tem permissão de acesso, redirecionando para `/unauthorized` caso contrário.

---

## Funcionalidades por Página

### Agendamento (`/agendamento`)
Calendário com visões de mês, semana e dia. Permite filtrar por profissional ou paciente. Ao clicar em uma consulta:
- **Profissional**: abre modal com dados do paciente, horário, profissionais da consulta, botão para ficha clínica e botão para iniciar a consulta (com confirmação).
- **Admin / Agendamento**: abre modal de edição com opções de alterar data, horário, profissional, tipo e excluir (incluindo exclusão de série recorrente).

### Ficha Clínica (`/pacientes/ficha-clinica`)
Exibe o prontuário completo do paciente: diagnóstico, convênio, hiperfoco, status de desfraldamento, anamnese, observações comportamentais, medicações ativas e dados da última consulta. Permite editar a ficha e visualizar a próxima consulta não concluída.

### Próxima Consulta
Acessada a partir da ficha clínica. Mostra a consulta futura com `confirmada = null` ou `confirmada = false`. Botão "Realizar anotações" navega para a tela de consulta atual.

### Consulta Atual (`/pacientes/consulta-atual`)
Tela de atendimento: exibe dados do paciente (idade, diagnóstico, hiperfoco, nível de atenção especial), profissional responsável, última consulta e campo para preenchimento das observações comportamentais da sessão.

### Últimas Consultas (`/pacientes/consultas-antigas`)
Histórico paginado de consultas com `confirmada = true` para o par profissional + paciente, ordenado da mais recente para a mais antiga. Ao clicar em uma consulta, abre modal com detalhes da sessão (observações, tratamento atual, materiais utilizados).

### Dashboard (`/dashboard`)
Visão geral com gráficos (ECharts) e indicadores da clínica.

### Cadastro de Pacientes (`/cadastro-paciente`)
Formulário de criação e edição de pacientes com dados pessoais e endereço.

---

## Autenticação

O token JWT é armazenado em `localStorage` com a chave `authToken`. As funções de leitura estão em `src/service/login/jwtDecoder.js`:

```js
getUserRoles()     // retorna array de roles do token
getFuncionarioId() // retorna o ID do profissional logado
getFuncionarioNome() // retorna o nome do usuário logado
```

---

## Como Executar

### Pré-requisitos

- Node.js 18+
- Backend CarePlus em execução em `http://localhost:8080`

### Instalação

```bash
cd Careplus-FrontEnd/careplus
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Build de Produção

```bash
npm run build
```

### Configuração da API

A URL base da API é configurada no arquivo de serviço `src/service/api.js`. Certifique-se de que o backend está acessível no endereço configurado.

---

## Equipe

Projeto acadêmico desenvolvido por alunos do 4º semestre da SPTech.
