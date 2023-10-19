import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isAvailable, setIsAvailable] = useState("");
    const [shipping, setShipping] = useState("");
    const [rating, setRating] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    // const [slug, setSlug] = useState("");

    //Function to get a single product
    const getSingleProduct = async () => {
        try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`
        );

        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setIsAvailable(data.product.isAvailable);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
        setRating(data.product.rating);

        } catch (error) {
            console.log(error);
        }
    };

        useEffect(() => {
            getSingleProduct();
            //eslint-disable-next-line
        }, []);

    //Function to get all products categories
    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Algo deu errado ao puxar as categorias");
        }
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);

      //Function to handle with the UPDATE PROCDUCT
      const handleUpdate = async (e) => {
        e.preventDefault();

        try {

          const productData = new FormData();

            productData.append("name", name);
            productData.append("description", description);
            photo && productData.append("photo", photo);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("isAvailable", isAvailable);
            productData.append("shipping", shipping);
            productData.append("rating", rating);
        
          const { data } = axios.put(
            `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
            productData
          );
          if (data?.success) {
            toast.error(data?.message);
          } else {
            toast.success("Produto atualizado com sucesso");
            navigate("/dashboard/admin/products");
          }
        } catch (error) {
          console.log(error);
          toast.error("Não conseguimos fazer a atualização das informações do produto");
        }
      };

      //Function to handle with DELETE Product
      const handleDelete = async () => {
        try {

          let answer = window.prompt("Tem certeza que deseja deletar esse produto da loja?");
          
          if (!answer) return;
          
          const { data } = await axios.delete(
            `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
          );
          toast.success("Equipamento excluído");
          navigate("/dashboard/admin/");
        
        } catch (error) {
            console.log(error);
            toast.error("Não conseguimos deletar esse produto");
        }
      };

  return (
    <Layout title={'Equipamentos cadastrados'}>
        <div className="container-fluid m-3 p-3">
         <div className="row"> 
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Equipamentos em estoque</h1>

                <div className="m-1 w-75"> 

                <Select 
                    bordered={false} 
                    placeholder="Escolha uma categoria" 
                     
                    showSearch 
                    className="form-select mb-3" 
                    onChange={(value) => {
                        setCategory(value);
                    }}
                    value={category}
                    >
                    {categories?.map(c => (
                        <Option key={c._id} value={c._id}>
                        {c.name}
                        </Option>
                    ))}
                </Select>


                <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${id}`}
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
                      placeholder="Preço do quipamento"
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
                      
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setIsAvailable(value);
                      }}
                      value={isAvailable ? "Sim" : "Não"}
                    >
                      <Option value="0">Não</Option>
                      <Option value="1">Sim</Option>
                    </Select>
                  </div>

                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Frete grátis"
                      
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                      value={shipping ? "Grátis" : "Pago"}
                    >
                      <Option value="0">Pago</Option>
                      <Option value="1">Grátis</Option>
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
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Atualizar equipamento
                    </button>
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Deletar equipamento
                    </button>
                  </div>

                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct