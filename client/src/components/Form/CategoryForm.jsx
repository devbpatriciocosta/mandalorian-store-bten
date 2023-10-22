import React from "react";

const CategoryForm = ({handleSubmmit, value, setValue}) => {
  return (
    <>
        <form onSubmit={handleSubmmit}>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder='Digite o nome da nova categoria' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    </>
  )
}

export default CategoryForm