import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center" style={{ backgroundColor: 'gainsboro' }}>
      <div className="list-group">
          <h4>Página do Usuário</h4>
          <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
            Perfil
            </NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
            Minhas Compras
          </NavLink>
      </div>
    </div>
  )
}

export default UserMenu
