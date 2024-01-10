import express from 'express'; //API Framework
import bodyParser from 'body-parser'; //Parsing Incoming data
import mongoose from 'mongoose'; // handling mongoDB Calls
import cors from 'cors'; //CROSS Browser Sharing
import dotenv from 'dotenv'; //enviroment variables 
import helmet from 'helmet'; // protecting API's
import morgan from 'morgan'; //logging our API Calls
import clientRoutes from './routes/clientRoutes.js';
import generalRoutes from './routes/generalRoutes.js';
import managementRoutes from './routes/managementRoutes.js';
import salesRoutes from './routes/salesRoutes.js';

// DATA IMPORTS

import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transactions from './models/Transactions.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat } from "./data/index.js";
import { validateLogin } from './controllers/login.js';
import OverallStat from './models/OverallStat.js';

// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes -

app.use("/login", validateLogin)
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP

console.log('DB Url', process.env.MONGO_URL);
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( async () => {
    app.listen(PORT, () => console.log(`Server PORT: ${PORT}`))
    // ONLY ADD DATA ONE TIME
    //const saltRounds = 10;

    // Map over each user and hash the password
    // const usersWithHashedPasswords = await Promise.all(dataUser.map(async user => {
    //     const hashedPassword = await bcrypt.hashSync(user.password, saltRounds);
    //     return {
    //         ...user,
    //         password: hashedPassword
    //     };
    // }));

    // Insert the users with hashed passwords into the database
    //await User.insertMany(usersWithHashedPasswords);
    //User.insertMany(dataUser);
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat);
    //Transactions.insertMany(dataTransaction);
    //OverallStat.insertMany(dataOverallStat);
}).catch((error) => console.log(`${error}`))