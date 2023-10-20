import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {

  const [values, setValues] = useSearch();

  return (
    <Layout title={"Resultado da busca"}>
      <div className="container">
        <div className="text-center">
          <h1>Encontramos esses equipamentos</h1>
          <h6>
            {values?.results.length < 1
              ? "Nenhum equipamento encontrado"
              : `Encontramos ${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {p.name}
                  </h5>
                  <p className="card-text">
                    {p.description}
                  </p>
                  <p className="card-text">
                    {p.price}
                  </p>
                  <p className="card-text">
                    {p.rating}
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">Saber mais</button>
                  <button class="btn btn-secondary ms-1">Carrinho</button>
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