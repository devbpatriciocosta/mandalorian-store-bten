import express from 'express';
import { registerController } from '../controllers/authController.js'

// Object Router
const router = express.Router();


//What is going to be routed? 

//User Registration with POST method
router.post('/register', registerController);


export default router