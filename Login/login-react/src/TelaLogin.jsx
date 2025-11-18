import { useState } from "react"
import "./login.css"

export function TelaLogin() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function logar() {
    alert("Login realizado!")
  }

  return (
    <div className="container-login">

      <div className="card-login">

        <img 
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          className="logo"
        />

        <h2>Solução Clínica</h2>

        <label>Login</label>
        <input 
          type="email"
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha</label>
        <input 
          type="password"
          placeholder="******"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={logar}>Entrar</button>

        <a href="#">Esqueceu sua senha?</a>

      </div>
    </div>
  )
}
