import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
    
        <div className="list-group">
            <h4>Página do Administrador</h4>
            <NavLink 
              to="/dashboard/admin/new-category" 
              className="list-group-item list-group-item-action">
                Nova categoria
            </NavLink>
            <NavLink 
              to="/dashboard/admin/new-product" 
              className="list-group-item list-group-item-action">
                Novo Produto
            </NavLink>
            <NavLink 
              to="/dashboard/admin/products" 
              className="list-group-item list-group-item-action">
                Equipamentos
            </NavLink>
            <NavLink 
              to="/dashboard/admin/users-list" 
              className="list-group-item list-group-item-action">
                Usuários
            </NavLink>
        </div>

    </div>
    </>
  )
}

export default AdminMenu