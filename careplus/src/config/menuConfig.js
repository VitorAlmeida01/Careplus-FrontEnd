import {
  Users,
  BarChart3,
  ClipboardMinus,
} from "lucide-react"

export const menuConfig = [
      {
    key: "tela-profissional",
    label: "Tela profissional",
    path: "/tela-profissional",
    icon: ClipboardMinus,
    roles: ["USER"],
  },
  {
    key: "funcionarios",
    label: "Funcionários",
    path: "/funcionarios",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    key: "pacientes",
    label: "Pacientes",
    path: "/pacientes",
    icon: Users,
    roles: ["USER", "ADMIN"],
  },
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: BarChart3,
    roles: ["ADMIN"],
  },
  // {
  //   key: "ficha-clinica",
  //   label: "Ficha Clínica",
  //   path: "/pacientes/ficha-clinica",
  //   icon: ClipboardMinus,
  //   roles: ["USER"],
  // },
  // {
  //   key: "consulta-atual",
  //   label: "Consulta Atual",
  //   path: "/pacientes/consulta-atual",
  //   icon: ClipboardMinus,
  //   roles: ["USER"],
  // },
  // {
  //   key: "consultas-antigas",
  //   label: "Consultas Antigas",
  //   path: "/pacientes/consultas-antigas",
  //   icon: ClipboardMinus,
  //   roles: ["USER"],
  // },
  {
    key: "agendamento-consulta",
    label: "Agendamento Consulta",
    path: "/agendamento-consulta",
    icon: ClipboardMinus,
    roles: ["USER", "ADMIN"],
  },
]