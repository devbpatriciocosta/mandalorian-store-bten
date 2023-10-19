import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Products = () => {

    const [products, setProducts] = useState([]);

    //Function to get All Products Saved
    const getAllProducts = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
          setProducts(data.products);
        } catch (error) {
          console.log(error);
          toast.error("Algo errado!");
        }
      };

      //Function to call the lificycle of products
      useEffect(() => {
        getAllProducts();
      }, []);


  return (
    <Layout>
        <div className="row">

            <div className="col-md-3">
                <AdminMenu />
            </div>

            <div className="col-md-9">
                <h1 className="text-center">
                    Equipamentos
                </h1>
                <div className="d-flex">
                    {products?.map((p) => (
                    <Link
                        key={p._id}
                        to={`/dashboard/admin/product/${p.slug}`}
                        className="product-link"
                        >
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                                <p className="card-text">{p.price}</p>
                                <p className="card-text">{p.rating}</p>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products