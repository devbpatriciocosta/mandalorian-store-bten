import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail]         = useState("");
    const [newPassword, setNewPassword]   = useState("");
    const [answer, setAnswer]   = useState("");

    const navigate                  = useNavigate();

    //Função do formulário 
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {email, newPassword, answer});
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
    <Layout title={'Recuperar senha - The Mandalorian Store'}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1 className="title">Recuperando a senha</h1>
                <h6 className="title">Recupere o acesso a sua conta</h6>


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

                {/* Pergunta secreta - Dica de senha */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Responda a pergunta secreta" 
                        required
                        autoFocus
                        />
                </div>

                {/* Senha */}
                <div className="mb-3">
                    <input 
                        type="password" 
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword} 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Senha você deve inserir" 
                        required
                        autoFocus
                        />
                </div>
                
              
                <div className="buttonSend">
                    <button type="submit" className="btn btn-primary">Recuperar</button>
                </div>
            </form>

        </div>
    </Layout>
  )
}

export default ForgotPassword