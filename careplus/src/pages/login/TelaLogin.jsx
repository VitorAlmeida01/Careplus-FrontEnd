import React from "react";
import "./login.css";
import logo from '/src/assets/logo.png';

export default function TelaLogin() {
  return (
    <div className="login-container">
      <div className="login-card">

        <img src={logo} alt="logo" className="login-logo"/>

        <h2>Solução Clínica</h2>

        <div className="login-field">
          <label>Login</label>
          <input type="email" placeholder="email@email.com"/>
        </div>

        <div className="login-field">
          <label>Senha</label>
          <input type="password" placeholder="******"/>
        </div>

        <button>Entrar</button>

        <a href="#" className="esqueceu">Esqueceu sua senha?</a>
      </div>

      <footer>Solução Clínica - Sistema de Gestão</footer>
    </div>
  );
}