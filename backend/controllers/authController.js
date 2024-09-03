const jwt = require('jsonwebtoken');
const User = require('../models/user');
const  bcrypt = require('bcryptjs');
require('dotenv').config();



// Login - /auth/login, POST
const login = async(req,res)=> {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
    };

        const isMatch = await user.matchPass(password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password'});
        };

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Middleware to verify user authentication
const verifyLogin = async(req, res, next)=>{
    try {
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).send("Access Denied: User not logged in!");
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

//  Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {login, verifyLogin, protect};
