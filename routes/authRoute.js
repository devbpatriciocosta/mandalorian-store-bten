import express from 'express';
import { registerController, loginController } from '../controllers/authController.js'

// Object Router
const router = express.Router();


//What is going to be routed? 

//User Registration with POST method
router.post('/register', registerController);

// User Login with POST method and JWT
router.post('/login', loginController); 


export default router