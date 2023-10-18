import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// Object Router
const router = express.Router();


//What is going to be routed? 

//User Registration with POST method
router.post('/register', registerController);

// User Login with POST method and JWT
router.post('/login', loginController); 

// To Recover forgotten password using method POST
router.post('/forgot-password', forgotPasswordController);

//Testing Routes after middlewares implementation
router.get('/test', requireSignIn, isAdmin,  testController);

//Creating protected routes
    //User Auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

    //Admin Auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router