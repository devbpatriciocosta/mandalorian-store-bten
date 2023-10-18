import express from 'express';
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// Object Router
const router = express.Router();


//What is going to be routed? 

//User Registration with POST method
router.post('/register', registerController);

// User Login with POST method and JWT
router.post('/login', loginController); 

//Testing Routes after middlewares implementation
router.get('/test', requireSignIn, isAdmin,  testController);

//Creating protected routes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router