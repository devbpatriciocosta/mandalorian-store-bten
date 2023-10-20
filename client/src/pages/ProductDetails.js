import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial Product Details config
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //Function to get the desired product
  const getProduct = async () => {
    
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`
      );

      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    
    } catch (error) {
      console.log(error);
    }
  };

  //Function to get the similar to the desired product
  const getSimilarProduct = async (pid, cid) => {
    
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Detalhes do Equipamento</h1>
          <h6>Nome : {product.name}</h6>
          <h6>Descrição : {product.description}</h6>
          <h6>Preço : R${product.price}</h6>
          <h6>Categoria : {product?.category?.name}</h6>
          <h6>Rating : {product?.rating}</h6>
          <button class="btn btn-secondary ms-1">Carrinho</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Talvez você também queira</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">Nenhum equipamento similar encontrado</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "20rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text"> R$ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  Ver mais
                </button>
                <button class="btn btn-secondary ms-1">Carrinho</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;