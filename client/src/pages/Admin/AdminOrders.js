import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {

  const [status, setStatus] = useState([
    "Não processada",
    "Processando",
    "Enviado",
    "Entregue",
    "Cancelada",
  ]);

  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Todos os pedidos"}>
      <div className="row dashboard styledPadding">

        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h1 className="text-center">Todos os pedidos</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Comprador</th>
                      <th scope="col">Data</th>
                      <th scope="col">Status do Pagamento</th>
                      <th scope="col">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"white" , borderRadius:'20px'}}> 
                          <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ width: '210px', height: '240px' }}
                        />
                      </div>
                      <div className="card-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                        
                        <h5 className="card-title" style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {p.name}
                        </h5>
                        <p className="card-text" style={{ width: '100%', height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                          {p.description}
                        </p>
                        <p className="card-text card-text-price">
                          <strong>R${p.price}</strong>
                        </p>
                        <p className="card-text">
                          <strong>Nota: </strong>{p.rating}
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
    </Layout>
  );
};

export default AdminOrders;