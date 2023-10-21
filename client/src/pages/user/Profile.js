import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/auth';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {

  const [auth, setAuth] = useAuth();

  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [phone, setPhone]         = useState("");
  const [address, setAddress]     = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
  }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
          name,
          email,
          password,
          phone,
          address,
        });

        if (data?.error) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Perfil atualizado!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Algo errado");
      }
    };

  return (
    <Layout title={"Meu perfil - The Mandalorian Store"}>
         <div className="container-fluid styledPadding">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h4 className="title">Editar dados</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Seu nome"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Seu email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Senha"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Número de telefone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Endereço"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Atualizar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile