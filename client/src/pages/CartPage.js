import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {

  const [auth, setAuth]                 = useAuth();
  const { cart, setCart, clearCart }                 = useCart();
  const [clientToken, setClientToken]   = useState("");
  const [instance, setInstance]         = useState("");
  const [loading, setLoading]           = useState(false);

  const navigate = useNavigate();

  //Function to calculate the total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Function to delete an equipment from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Function to get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //FUnction to handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("O pagamento foi efetuado com sucesso!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to clear the entire cart
  // const clearEntireCart = () => {
  //   if (cart.length > 0) {
  //     if (window.confirm("Tem certeza que deseja esvaziar o carrinho??")) {
  //       clearCart(); 
  //       toast.success("Seu carrinho foi esvaziado!");
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className="container" >
            <div className="row">
            <div className="col-md-12" style={{ backgroundColor: 'gray' }}>
                <h1 className="text-center p-2 mb-1" style={{ backgroundColor: 'gray' }} >
                  {`E aí! ${auth?.token && auth?.user?.name}`}
                </h1>
                <h4 className="text-center">
                {cart?.length
                    ? `Você tem ${cart.length} equipamento(s) no seu carrinho ${
                        auth?.token ? "" : "Por favor, faça login ou cadastre-se para comprar"
                    }`
                    : "Seu carrinho está vazio"}
                </h4>
            </div>
            </div>
            <div className="row">
            <div className="col-md-8">
                {cart?.map((p) => (
                <div key={p._id} className="row mb-2 p-3 card flex-row">
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
                      <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                      >
                          Remover
                      </button>
                    </div>
                    
                </div>
                ))}
                {/* <div>
                  {cart.length > 0 && (
                    <div> 
                      <button
                        className="btn btn-danger"
                        onClick={clearEntireCart}
                      >
                        Esvaziar carrinho
                      </button>
                    </div>
                  )}
                </div> */}
            </div>
            <div className="col-md-4 text-center">
                <h2>Resumo da compra</h2>
                <p>Total | Checkout | Pagamento</p>
                <hr />
                <h4>Total: R{totalPrice()} </h4>
                {auth?.user?.address ? (
                <>
                    <div className="mb-3">
                    <h4>Endereço atual</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                    >
                        Atualizar endereço
                    </button>
                    </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Atualizar endereço
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Por favor, faça o login para finalizar a compra
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processando..." : "Pagar"}
                  </button>
                </>
              )}
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;