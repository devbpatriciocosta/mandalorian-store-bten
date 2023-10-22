import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");
    const [auth, setAuth]           = useAuth();

    const navigate                  = useNavigate();
    const location                  = useLocation();

    //Função do formulário 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email, password});
            if(res && res.data.success) {
                toast.success(res.data.message, {
                    duration: 6000, 
                });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                    navigate(location.state || '/')
            } else { 
                toast.error(res.data.message, {
                    duration: 10000, 
                });
            }
        } catch (error) {
            console.log(error)
            toast.error("Algo de errado não está certo!")
        }
    };

  return (
    <Layout title={"Cadastre-se - The Mandalorian Store - Compre agora!"}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1 className="title">Faça seu login</h1>
                <h6 className="title">Finalize sua compra, acesse sua conta!</h6>
                {/* Email */}
                <div className="mb-3">
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Email você deve inserir" 
                        required
                        autoFocus
                        />
                </div>
                {/* Senha */}
                <div className="mb-3">
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Senha você deve inserir" 
                        required
                        autoFocus
                        />
                </div>
                <div className="mb-3 buttonSend">
                    <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>Esqueci minha senha</button>
                </div>
                <div className="buttonSend">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Login