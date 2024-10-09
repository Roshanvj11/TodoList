const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
    try {
        const user = await findUserExist('users', { email });
        console.log('user', user)
        if (!user) {
            console.log('User not registered')
        } else {
            return res.status(200).json({ message: 'user registered' })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('password not match')
        } else {
            return res.status(200).json({ message: 'user password match' })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });

    }
})

module.exports = router;