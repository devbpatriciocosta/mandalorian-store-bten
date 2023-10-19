import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { addNewProductController, getProductsController, getSingleProductController, getProductPhotoController, deleteProductController, updateProductController } from '../controllers/newProductsController.js';
import formidable from 'express-formidable';

const router = express.Router();

// Routes of products characteristics
    //Route to add product using POST method
router.post('/new-product', requireSignIn, isAdmin, formidable(), addNewProductController);

//Route to UPDATE product using UPDATE method
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

    //Route to get products using GET method
router.get('/get-products', getProductsController);

    //Route to get only one product using GET method
router.get('/get-single-product/:slug', getSingleProductController);

    // Route to get the product photo using GET method
router.get('/get-product-photo/:pid', getProductPhotoController);

    // Route to delete product using DELETE method
router.delete('/product/:pid', requireSignIn, isAdmin, formidable(), deleteProductController )

export default router;