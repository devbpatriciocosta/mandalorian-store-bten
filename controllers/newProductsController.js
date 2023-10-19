import productsDetailsModel from "../models/productsDetailsModel.js";
import slugify from "slugify";
import fs from "fs";

export const addNewProductController = async (req, res) => {
    try {
        const {name, description, price, category, quantity, isAvailable, shipping, rating, slug} = req.fields
        const {photo} = req.files

        //Validation using switch case statement
        switch(true) {
            case !name:
                return res.status(500).send({error: 'Necessário inserir o nome do produto'})
                case !description:
                    return res.status(500).send({error: 'Necessário inserir a descrição do produto'})
                    case !price:
                        return res.status(500).send({error: 'Necessário inserir o preço do produto'})
                        case !category:
                            return res.status(500).send({error: 'Necessário inserir a categoria do produto'})
                            case !quantity:
                                return res.status(500).send({error: 'Necessário inserir a quantidade do produto'})
                                // case !isAvailable:
                                //     return res.status(500).send({error: 'Necessário inserir a disponibilidade do produto'})
                                    case !photo && photo.size > 1000000:
                                        return res.status(500).send({error: 'Necessário inserir o frete do produto'})
                                        // case !rating:
                                        //     return res.status(500).send({error: 'Necessário inserir a avaliação do produto'})
        }

        const products = new productsDetailsModel({...req.fields, slug:slugify(name)})
        
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Um novo produto foi adicionado com sucesso',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error, 
            message: 'Erro ao adicionar um novo produto'
        })
    }
};

//Controller to UPDATE product
export const updateProductController = async (req, res) => {
    try {
        const {name, description, price, category, quantity, isAvailable, shipping, rating, slug} = req.fields
        const {photo} = req.files

        //Validation using switch case statement
        switch(true) {
            case !name:
                return res.status(500).send({error: 'Necessário inserir o nome do produto'})
                case !description:
                    return res.status(500).send({error: 'Necessário inserir a descrição do produto'})
                    case !price:
                        return res.status(500).send({error: 'Necessário inserir o preço do produto'})
                        case !category:
                            return res.status(500).send({error: 'Necessário inserir a categoria do produto'})
                            case !quantity:
                                return res.status(500).send({error: 'Necessário inserir a quantidade do produto'})
                                // case !isAvailable:
                                //     return res.status(500).send({error: 'Necessário inserir a disponibilidade do produto'})
                                    case !photo && photo.size > 1000000:
                                        return res.status(500).send({error: 'Necessário inserir o frete do produto'})
                                        // case !rating:
                                        //     return res.status(500).send({error: 'Necessário inserir a avaliação do produto'})
        }

        const products = await productsDetailsModel.findByIdAndUpdate(req.params.pid, 
            {...req.fields, slug: slugify(name)}, {new:true}
            )
        
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'O produto foi atualizado com sucesso',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error, 
            message: 'Erro ao atualizar o produto'
        })
    }
};

//Controller to GET all products
export const getProductsController = async (req, res) => {
    try {
        const products = await productsDetailsModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "Todos os produtos disponíveis",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erro ao mostrar todos os produtos",
            error: error.message
        })
    }
};

//Controller to Get a SINGLE product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productsDetailsModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: 'O produto escolhido foi selecionado',
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erro ao mostrar um produto",
            error: error.message
        })
    }
};

//Controller to get the product photo
export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productsDetailsModel.findById(req.params.pid).select("photo")
        if(product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erro ao mostrar a foto do produto",
            error: error.message
        })
    }
};

// Controller to delete a product 
export const deleteProductController = async (req, res) => {
    try {
        await productsDetailsModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: 'O produto foi deletado',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erro ao deletar um produto",
            error: error.message
        })
    }
};
