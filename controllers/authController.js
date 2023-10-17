import { hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body

        //Validations needed
        if (!name) { 
            return res.send({error: 'Name is required! '})
        }
        if (!email) { 
            return res.send({error: 'Email is required! '})
        }
        if (!password) { 
            return res.send({error: 'Password is required! '})
        }
        if (!phone) { 
            return res.send({error: 'Phone is required! '})
        }
        if (!address) { 
            return res.send({error: 'Address is required! '})
        }

        //Verification of existing users by email
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
           return res.status(200).send({
            success: true, 
            message: 'This user is already registered, please login to buy!'
           }) 
        }

        //Verification to register users
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name, email, phone, address, password:hashedPassword}).save()

        res.status(201).send({
            success: true,
            message: 'A new user was registered succesfully',
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Shit, here we go again! Error in user registration',
            error
        })
    }
}; 

