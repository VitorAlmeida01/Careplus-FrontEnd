import {
  Users,
  BarChart3,
  ClipboardMinus,
  Calendar,
  IdCardLanyard
} from "lucide-react"

export const menuConfig = [
      {
    key: "Consultas",
    label: "Consultas",
    path: "/consultas",
    icon: ClipboardMinus,
    roles: ["USER"],
  },
  {
    key: "funcionarios",
    label: "Funcionários",
    path: "/funcionarios",
    icon: IdCardLanyard,
    roles: ["ADMIN"],
  },
  {
    key: "pacientes",
    label: "Pacientes",
    path: "/pacientes",
    icon: Users,
    roles: ["USER", "ADMIN", "SCHEDULER"],
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
    icon: Calendar,
    roles: ["USER", "ADMIN", "SCHEDULER"],
  },
    {
    key: "responsaveis",
    label: "Responsáveis",
    path: "/responsaveis",
    icon: IdCardLanyard,
    roles: ["SCHEDULER", "ADMIN"],
  },
]