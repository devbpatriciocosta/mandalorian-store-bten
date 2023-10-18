import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const NewProduct = () => {
  return (
    <Layout title={'Dashboard - Novo Produto'}>
        <div className="container-fluid m-3 p-3">
         <div className="row"> 
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Add um novo produto aí Mandalorian carai</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default NewProduct