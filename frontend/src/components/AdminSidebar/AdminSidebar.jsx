import './AdminSidebar.css'
import Logo from '../../assets/O SOM DA NOITE.png'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <Link to="/admin">
        <img
          src={Logo}
          alt="Logo"
          className="admin-logo"
        />
      </Link>
      <nav className="admin-menu">
        <Link to="/admin">
          <button className="admin-item">Visão Geral</button>
        </Link>
        <Link to="/admin/cadastrar-faixa">
          <button className="admin-item">Cadastrar Faixa</button>
        </Link>
        <Link to="/admin/listar-faixas">
          <button className="admin-item">Listar Faixas</button>
        </Link>
        <Link to="/admin/listar-usuarios">
          <button className="admin-item">Listar Usuários</button>
        </Link>
        <Link to="/admin/locucionar">
          <button className="admin-item">Locucionar</button>
        </Link>
      </nav>
    </aside>
  )
}

export default AdminSidebar