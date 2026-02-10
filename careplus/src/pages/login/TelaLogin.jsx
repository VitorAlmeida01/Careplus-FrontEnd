import React from "react"
import "./login.css"
import logo from "/src/assets/logo.png"
import { Link } from "react-router-dom"

// Coloquei a classe que ja estava feita e fui colocando as classes do tailwind
//  .login-container {
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 20px;
//   padding: 20px;
// }

// Link da documentação
// https://tailwindcss.com/docs/flex

export default function TelaLogin() {
  return (
    <div className=" flex flex-col h-screen justify-center items-center gap-5 p-2">
      <div className="flex flex-col items-center w-sm p-10 bg-white rounded-3xl text-center shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
        <img src={logo} alt="logo" className="login-logo" />

        <h2 className="font-medium m-[30px] text-gray-700">Solução Clínica</h2>

        <div className="login-field w-full ">
          <label>Login</label>
          <input
            type="email"
            placeholder="email@email.com"
            className="w-full border-10 border-black"
          />
        </div>

        <div className="login-field w-full">
          <label>Senha</label>
          <input type="password" placeholder="******" />
        </div>

        {/* <button className="botaologin"></button> */}

        <Link to={"/funcionarios"} className="botaologin w-full">
          Login
        </Link>

        <a href="#" className="esqueceu">
          Esqueceu sua senha?
        </a>
      </div>

      <footer>Solução Clínica - Sistema de Gestão</footer>
    </div>
  )
}
