import {
  Users,
  BarChart3,
  ClipboardMinus,
} from "lucide-react"

export const menuConfig = [
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
    roles: ["FONOAUDIOLOGA", "ADMIN"],
  },
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: BarChart3,
    roles: ["ADMIN"],
  },
  {
    key: "ficha-clinica",
    label: "Ficha Clínica",
    path: "/ficha-clinica",
    icon: ClipboardMinus,
    roles: ["FONOAUDIOLOGA"],
  },
  {
    key: "consulta-atual",
    label: "Consulta Atual",
    path: "/consulta-atual",
    icon: ClipboardMinus,
    roles: ["FONOAUDIOLOGA"],
  },
  {
    key: "consultas-antigas",
    label: "Consultas Antigas",
    path: "/consultas-antigas",
    icon: ClipboardMinus,
    roles: ["FONOAUDIOLOGA"],
  },
]