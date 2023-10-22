import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {

  const categories = useCategory();

  return (
    <Layout title={"Todas as categorias"}>
      <div className="container">
        <div className="row justify-content-center">
          {categories.map((c) => (
            <div className="col-md-3 mt-5 mb-3" key={c._id}>
              <Link to={`${process.env.REACT_APP_API}/category/${c.slug}`} className="btn btn-dark" style={{ width: '100px' }}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;