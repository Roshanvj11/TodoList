const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    registerData,
    findUserExist
} = require('../DB/database');

router.post('/router', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('req.body.email', req.body.email);
    console.log('req.body.password', req.body.password);

    //Bcrypt implementation
    const saltRounds = 10;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: "Error hashing password" });
    }

    const regData = {
        username: username,
        email: email,
        password: hashedPassword,
        cAt: new Date()
    }
    console.log('regData', regData)
    res.json({ message: "Data received successfully" });
    try {
        const result = await registerData('users', regData);
        console.log('result', result);
    } catch (error) {
        console.error("error in router, addReviewData", error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log('req.body.email', req.body.email)
    try {
        const user = await findUserExist('users', { username });
        console.log('user', user)

        if (!user) {
            return res.status(500).json({ message: 'user not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(500).json({ message: 'Incorrect password' });
        }

        //Token creation
        const token = jwt.sign({ id: user._id, name: user.username, email: user.email }, process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
        console.log('token', token);

        //sending token and message to the frontend Login 
        return res.status(200).json({
            message: 'Login successful',
            token: token
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });

    }
});

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '').trim();
    console.log('Authorization Header:', req.header('Authorization'));

    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log('Decoded user:', decoded); // Log decoded user info
        req.user = decoded;
        next()
    } catch (error) {
        console.error('JWT verification error:', error); // Log the error for debugging
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

router.get('/whoami', authenticateJWT, (req, res) => {
    res.json(req.user); // The user info from the token
  });

module.exports = router;