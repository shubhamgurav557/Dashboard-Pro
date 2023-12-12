import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

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
