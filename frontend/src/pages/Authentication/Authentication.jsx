import React from 'react'
import { useState } from "react";
import "./Authentication.css";

const Authentication = () => {
    const [mode, setMode] = useState("login");

    return (
      <div className="auth-wrapper">
        <div className={`auth-card ${mode}`}>
          <div className="auth-toggle">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              Acesso
            </button>
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => setMode("register")}
            >
              Cadastro
            </button>
            <span className={`slider ${mode}`} />
          </div>
  
          <form className="auth-form">
            <h2>{mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}</h2>
  
            {mode === "register" && (
              <div className="input-group fade-in">
                <input type="text" required />
                <label>Nome de usuário</label>
              </div>
            )}
  
            <div className="input-group fade-in">
              <input type="email" required />
              <label>E-mail</label>
            </div>
  
            <div className="input-group fade-in">
              <input type="password" required />
              <label>Senha</label>
            </div>
  
            <button className="submit-btn">
              {mode === "login" ? "Entrar" : "Criar Conta"}
            </button>
          </form>
        </div>
      </div>
    )
}

export default Authentication