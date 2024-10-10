const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    registerData,
    findUserExist
} = require('../DB/database');

router.post('/router', async (req, res) => {
    const { email, password } = req.body;
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
    const { email, password } = req.body;
    // console.log('req.body.email', req.body.email)
    //Token creation
    const token = jwt.sign(email, process.env.JWT_SECRET_KEY);
    console.log('token', token);

    try {
        const user = await findUserExist('users', { email });
        console.log('user', user)


        if (!user) {
            return res.status(500).json({ message: 'user not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(500).json({ message: 'Incorrect password' });
        }

        //sending token and message to the frontend Login 
        return res.status(200).json({
            message: 'Login successful',
            token: token
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });

    }
})

module.exports = router;