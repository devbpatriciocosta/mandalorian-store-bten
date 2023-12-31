import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Registration = () => {

    const [name, setName]           = useState("");
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");
    const [phone, setPhone]         = useState("");
    const [address, setAddress]     = useState("");
    const [answer, setAnswer]       = useState("");
    const navigate                  = useNavigate();

//Função do formulário 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name, email, password, phone, address, answer});
            if(res && res.data.success) {
                toast.success(res.data.message, {
                    duration: 6000, 
                });
                navigate('/login')
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
                <h1 className="title">Cadastre-se aqui</h1>
                <h6 className="title">Para dar continuidade a sua compra, <br></br> é necessário se cadastrar</h6>
                {/* Nome  */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Nome você deve inserir" 
                        required
                        autoFocus
                        />
                </div>
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
                {/* Phone */}
                <div className="mb-3">
                    <input 
                        type="number" 
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Telefone você deve inserir" 
                        required
                        autoFocus
                        />
                </div>
                {/* Address */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        onChange={(e) => setAddress(e.target.value)}
                        value={address} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Endereço você deve inserir" 
                        required
                        autoFocus
                        />
                </div>
                {/* Answer */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="O que poderia lembrar a sua senha?" 
                        required
                        autoFocus
                        />
                </div>
                <div className="buttonSend">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Registration