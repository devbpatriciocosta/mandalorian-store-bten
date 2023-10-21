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
    <Layout >
      <div className="row container styledPadding ">
        <div className="col-md-6" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ width: '210px', height: '240px', borderRadius:"20px" }}
          />
        </div>

        <div className="col-md-6 text-center" style={{ display:'flex', gap:'20px', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <h1 className="text-center" style={{ borderBottom: '1px solid black', lineHeight: '70px' }}>Detalhes do Equipamento</h1>
          <h6><strong>Nome:</strong> {product.name}</h6>
          <h6><strong>Descrição: </strong> {product.description}</h6>
          <h6><strong>Preço:</strong> R${product.price}</h6>
          <h6><strong>Categoria:</strong> {product?.category?.name}</h6>
          <h6><strong>Nota:</strong> {product?.rating}</h6>
          <button class="btn btn-secondary ms-1" style={{ width:'100px' }}>Carrinho</button>
        </div>
      </div>
      <hr />

      <div className="row container" >
        <h2>Talvez você também queira</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">Nenhum equipamento similar encontrado</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"white" , borderRadius:'20px'}}> 
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p?._id}`}
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
      </div>
    </Layout>
  );
};

export default ProductDetails;