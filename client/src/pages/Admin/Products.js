import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { AiFillStar } from "react-icons/ai";

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
        <div className="container-fluid row styledPadding">

            <div className="col-md-3">
                <AdminMenu />
            </div>

            <div className="col-md-9">
                <h1 className="text-center" style={{ display:'flex' }}>
                    Equipamentos existentes no banco de dados
                </h1>
                <h6 className="text-center" style={{ display:'flex' }}>
                    (Clique no equipamento para edita-lo)
                </h6>
                
                <div className="d-flex flex-wrap">
                    {products?.map((p) => (
                    <Link
                        key={p._id}
                        to={`/dashboard/admin/product/${p.slug}`}
                        className="product-link"
                        >
                        <div className="card m-2" style={{ width: "18rem" }}>
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
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'5px'}}>
                        <p className="card-text" style={{ display: 'inline' }}>
                          <strong style={{ verticalAlign: 'middle' }}>{p.rating}</strong>
                          <AiFillStar className="custom-star-icon" style={{ verticalAlign: 'middle' }} />
                        </p>
                      </div>
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