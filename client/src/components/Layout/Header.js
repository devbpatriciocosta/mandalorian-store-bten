import React from 'react'
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* <NavLink className="navbar-brand" href="#">Navbar</NavLink> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <Link to="/" className="navbar-brand">
                        <img src="icons/mandaloriaIcon.png" alt="Icon" width="50" height="50" />
                        The Mandalorian Store 
                    </Link>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/category" className="nav-link">Categorias</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Cadastre-se</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link" >Fazer Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">Carrinho (0)</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header