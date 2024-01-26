import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transactions.js'


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        console.log('Register Log', req.body);
        
        const { name, email, password, occupation, country, state, city, phoneNumber } = req.body;
        const userVerify = await User.findOne({ email });

        if (userVerify) {
            return res.status(500).json({ message: 'User Already Exists' });
        }
        
        const hashedPassword = bcrypt.hashSync(password, 10);
      
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            occupation,
            country,
            state,
            city
        });

        const savedUser = await newUser.save();
        console.log('Saved User Details', savedUser);

        if (savedUser) {
            const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
            return res.status(200).json({ success: true, message: 'Registered Successfully', token });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getDashboardStats = async (req, res) => {
    try {
        const currentMonth = "November";
        const currentYear= 2021;
        const currentDay = "2021-11-15";

        const transactions = await Transaction.find().limit(50).sort({createdOn: -1}) //Showing latest 50 transactions
        const overallstats = await OverallStat.find({year: currentYear});
        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallstats[0]

        const thisMonthStats = overallstats[0].monthlyData.find(({month}) => {
            return month === currentMonth;
        });

        const todayStats = overallstats[0].dailyData.find(({date}) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 