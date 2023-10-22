import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const Search = () => {

  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Resultado da busca"}>
      <div className="container">
        <div className="text-center">
          <h1>Pesquisa de equipamentos</h1>
          <h6>
            {values?.results.length < 1
              ? "Nenhum equipamento encontrado"
              : `Encontramos ${values?.results.length} equipamentos(s)`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
                        <strong>R$ {p.price}</strong>
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'5px'}}>
                        <p className="card-text" style={{ display: 'inline' }}>
                          <strong style={{ verticalAlign: 'middle' }}>{p.rating}</strong>
                          <AiFillStar className="custom-star-icon" style={{ verticalAlign: 'middle' }} />
                        </p>
                      </div>
                      
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        Saber mais
                      </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;