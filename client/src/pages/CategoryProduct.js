import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";

const CategoryProduct = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container styledPadding ">
        <h4 className="text-center">
            Categoria - {category?.name}
        </h4>
        <h6 className="text-center">
            {products?.length} resultados encontrados 
        </h6>

        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"white" , borderRadius:'20px'}}> 
                      <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ width: '210px', height: '240px' }}
                    />
                  </div>

                  <div className="card-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                    <h5 className="card-title" style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{p.name}</h5>
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

                    <div>
                        <button
                                        className="btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                      >
                                        Saber mais
                                      </button>
                                      <button class="btn btn-secondary ms-1">Carrinho</button>
                                      </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;