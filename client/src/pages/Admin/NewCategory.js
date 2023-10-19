import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const NewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/new-category`,
        { name }
      );
      if (data?.success) {
        // Optimistically update the UI
        setCategories([...categories, { _id: data._id, name }]);
        toast.success(`Beleza, criamos a categoria ${name}`);
        setName(""); // Clear the input field
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Aconteceu algo errado aqui!');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Não conseguimos mostrar as categorias');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e ) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success) {
        toast.success(`${updatedName} foi atualizado`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Algo de errado não está certo')
    }
  };

  const handleDelete = async (pId) => {
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`, {name:updatedName})
      if(data.success) {
        toast.success(`Categoria apagada`);
        getAllCategories();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Algo de errado não está certo')
    }
  };

  return (
    <Layout title={'Dashboard - Nova Categoria'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Adicionar uma nova categoria</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Categoria</th>
                    <th scope="col">Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  ) : (
                    categories.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" 
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                            }}
                            >
                              Editar
                            </button>
                          <button className="btn btn-danger ms-2"
                          onClick={() => {handleDelete(c._id)}}
                          >Deletar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}> 
  <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmmit={handleUpdate} />
</Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default NewCategory