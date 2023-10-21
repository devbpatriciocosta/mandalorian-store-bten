import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Minhas Compras - The Mandalorian Store"}>
        <div className="container-flui styledPadding dashboard">
        <div className="row">
          <div className="col-md-3" style={{ paddingLeft: '100px' }}>
            <UserMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">Minhas compras</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data da compra</th>
                        <th scope="col">Pagamento</th>
                        <th scope="col">Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Aceito" : "Recusado"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        
                        <div className="col-md-4">
                      <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ width: '250px', height: '240px', borderRadius:'20px' }}
                      />
                    </div>

                    <div className="col-md-8" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      <p><strong>{p.name}</strong></p>
                      <p>{p.description}</p>
                      <p className="card-text card-text-price">
                        <strong>R${p.price}</strong>
                      </p>
                    </div>

                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders