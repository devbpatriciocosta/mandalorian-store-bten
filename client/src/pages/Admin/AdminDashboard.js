import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {

  const [auth] = useAuth();

  return (

    <Layout title={"Dashboard - Administrador"}>
      <div className="container-fluid m-3 p-3"></div>
      <div className="row"> 
          <div className="col-md-3">
              <AdminMenu />
          </div>
          <div className="col-md-9">

            <div className="card w-75 p-3">
              <h3> Nome do Administrador: {auth?.user?.name}</h3>
              <h3> Email do Administrador: {auth?.user?.email}</h3>
              <h3> Contato do Administrador: {auth?.user?.phone}</h3>
            </div>

          </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard