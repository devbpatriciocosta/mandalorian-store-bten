import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const UsersList = () => {
  return (
    <Layout title={'Dashboard - Lista de usuários'}>
        <div className="container-fluid m-3 p-3">
            <div className="row"> 
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Quem ta comprando aí porra? </h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UsersList