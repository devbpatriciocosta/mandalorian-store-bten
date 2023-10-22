import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Select} from "antd";
import { useNavigate } from "react-router-dom";


const {Option} = Select

const NewProduct = () => {

  const [categories, setCategories]       = useState([]);
  const [name, setName]                   = useState("");
  const [description, setDescription]     = useState("");
  const [price, setPrice]                 = useState("");
  const [category, setCategory]           = useState("");
  const [quantity, setQuantity]           = useState("");
  const [isAvailable, setIsAvailable]     = useState("");
  const [shipping, setShipping]           = useState("");
  const [rating, setRating]               = useState("");
  const [photo, setPhoto]                 = useState("");

  const navigate                          = useNavigate();

  //To Get All Category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Não conseguimos mostrar as categorias');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //To create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("photo", photo);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("isAvailable", isAvailable);
      productData.append("shipping", shipping);
      productData.append("rating", rating);
      
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/new-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Equipamento adicionado");
        navigate("/dashboard/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Esse equipamento não pode ser adicionado");
    }
  };

  return (
    <Layout title={'Dashboard - Novo Equipamento'}>
        <div className="container-fluid styledPadding">
         <div className="row"> 
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Adicionar um novo produto</h1>
                <div className="m-1 w-75"> 
                  <Select 
                    bordered={false} 
                    placeholder="Escolha uma categoria" 
                    size="large" 
                    showSearch 
                    className="form-select mb-3" 
                      onChange={(value) => {setCategory(value)}}>
                        {categories?.map(c => (
                          <Option key={c._id} value={c._id}>
                            {c.name}
                          </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <label className="btn btn-outline-secondary btn-light col-md-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="Nome do equipamento"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="Descrição do equipamento"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="Preço do equipamento"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Quantidade disponível"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Disponibilidade"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setIsAvailable(value);
                      }}
                    >
                      <Option value="0">Não</Option>
                      <Option value="1">Sim</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Frete grátis"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="0">Não</Option>
                      <Option value="1">Sim</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={rating}
                      placeholder="Rating"
                      className="form-control"
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleCreate}>
                      Adicionar equipamento
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default NewProduct