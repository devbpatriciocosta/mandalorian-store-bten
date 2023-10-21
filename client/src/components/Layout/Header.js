import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Você saiu!")
    };

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <Link to="/" className="navbar-brand nav-link-no-hover">
                        {/* <img src="icons/mandaloriaIcon.png" alt="Icon" width="50" height="50" /> */}
                        The Mandalorian Store 
                    </Link>
                    
                    <div className="d-flex justify-content-center">
                        <SearchInput />
                    </div>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link nav-link-no-hover">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                            className="nav-link dropdown-toggle nav-link-no-hover"
                            to={"/categories"}
                            data-bs-toggle="dropdown"
                            >
                                Categorias
                            </Link>
                            
                            <ul className="dropdown-menu">
                                {/* <li>
                                    <Link className="dropdown-item" to={"/categories"}>
                                        Todas
                                    </Link>
                                </li> */}
                            {categories?.map((c) => (
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={`/category/${c.slug}`}
                                    >
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                            </ul>
                        </li>
                       { 
                            !auth.user ? 
                            (
                            <>
                            <li className="nav-item">
                                <NavLink to="/registration" className="nav-link nav-link-no-hover">Cadastre-se</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link nav-link-no-hover" >Fazer Login</NavLink>
                            </li>
                            </>
                            ) : (
                                <>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle nav-link-no-hover" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={handleLogout} to="/login" className="dropdown-item ">Logout</NavLink>
                                        </li>
                                    </ul>
                                </li>

                                </>
                            ) 
                       
                        }
                         <li className="nav-item">
                            <Badge count={cart?.length} showZero>
                                <NavLink to="/cart" className="nav-link small-font nav-link-no-hover">
                                    Carrinho
                                </NavLink>
                            </Badge>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header