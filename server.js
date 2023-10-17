import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/dataBase.js';
import authRoute from './routes/authRoute.js';


//Env Configuration
dotenv.config();

//Database Configuration
connectDB();

//REST Object
const app = express();

//Middlewares configuration
app.use(express.json());
app.use(morgan('dev'));

//Routes Configuration
app.use("/api/v1/auth", authRoute )

//REST API
app.get('/', (req, res) => {
    res.send(
        "<h1>Welcome to THE Mandalorian Store!</h1>"
    )
});

//PORT server configuration
const PORT = process.env.PORT || 8080;

//Listener
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgYellow.white);
});