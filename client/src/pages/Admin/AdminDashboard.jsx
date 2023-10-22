import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {

  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Administrador"}>
        <div className="container-fluid styledPadding">
          <div className="row">
            <div className="col-md-3"> 
                <AdminMenu />
            </div>
            <div className="text-center col-md-9"> 
                <div className="card w-75 p-3">
                  <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', backgroundColor: 'gainsboro' }}> Olá, {auth?.user?.name}! <br></br> Seja bem-vindo(a) ao seu perfil</h3>
                  <h3> <strong>Seu Email:</strong> {auth?.user?.email}</h3>
                  <h3> <strong>Seu Contato: </strong>{auth?.user?.phone}</h3>
                  <h3> <strong>Seu Endereço: </strong>{auth?.user?.address}</h3>
                </div>
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard