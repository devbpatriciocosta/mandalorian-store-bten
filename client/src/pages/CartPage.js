import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  //Function to calculate the total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
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

  return (
    <Layout>

      <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h1 className="text-center bg-light p-2 mb-1">
                {`E aí, ${auth?.token && auth?.user?.name}`}
                </h1>
                <h4 className="text-center">
                {cart?.length
                    ? `Você tem ${cart.length} equipamentos no seu carrinho ${
                        auth?.token ? "" : "Por favor, faça login ou cadastre-se para comprar"
                    }`
                    : "Seu carrinho está vazio"}
                </h4>
            </div>
            </div>
            <div className="row">
            <div className="col-md-8">
                {cart?.map((p) => (
                <div className="row mb-2 p-3 card flex-row">
                    <div className="col-md-4">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        
                    />
                    </div>
                    <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Preço: R${p.price}</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                    >
                        Remover
                    </button>
                    </div>
                </div>
                ))}
            </div>
            <div className="col-md-4 text-center">
                <h2>Resumo da compra</h2>
                <p>Total | Checkout | Pagamento</p>
                <hr />
                <h4>Total : R${totalPrice()} </h4>
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
                    Por favor, cadastre-se ou faça login para comprar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default CartPage;