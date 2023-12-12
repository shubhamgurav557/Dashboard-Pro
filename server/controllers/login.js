import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const validateLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const enteredPassword = req.body.password.trim();
            const storedHashedPassword = user.password.trim();
            const isPasswordValid = await bcrypt.compareSync(enteredPassword, storedHashedPassword);

            if (isPasswordValid) {
                const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' })
                return res.json({ success: true, message: 'Logged In Successfully', token });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid Password' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

