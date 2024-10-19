const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    PostData,
    findUserExist,
    getData,
    update,
    Delete
} = require('../DB/database');
const { ObjectId } = require('mongodb');

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
        const result = await PostData('users', regData);
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
        const token = jwt.sign({ id: user._id, name: user.username, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });
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
    // console.log('Authorization Header:', req.header('Authorization'));

    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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

router.post('/TodayData', async (req, res) => {
    const { userId, userName, userEmail, Task, TaskDate, Time } = req.body;
    console.log('userId', req.body.userId)

    const TodayData = {
        userId: new ObjectId(userId),
        userName: userName,
        userEmail: userEmail,
        Task: Task,
        Date: TaskDate,
        Time: Time,
        status: 'pending',
        cAt: new Date()
    }
    console.log('data', TodayData)


    try {
        await PostData('TodoData', TodayData);

        const io = req.app.get('socketio');
        io.emit('todayData', TodayData);

        return res.status(200).json({
            message: 'TodayData post successful',
            // result: result,
        })
    } catch (error) {
        console.error("error in router, addReviewData", error);
    }

})


router.get('/getTodayData/:id', async (req, res) => {
    const { id } = req.params;
    console.log('req.params.id', req.params.id)
    try {
        const result = await getData('TodoData', id);
        console.log('result', result)
        res.status(200).json(result);

    } catch (error) {
        console.error("error in router, getting today data", error);
        res.status(500).json({ message: 'Error fetching data' });

    }
})

//update status 

router.put('/updateStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log('req.params.id', req.params.id);
    console.log('req.body.status', req.body.status);
    try {
        const result = await update('TodoData', id, status);
        console.log('result', result)

        if (result) {
            const io = req.app.get('socketio'); // Access the Socket.IO instance
            io.emit('statusUpdated', { taskId: id, status: status });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("error in router, updating today data", error);
        res.status(500).json({ message: 'Error updating data' });
    }
})

//delete task

router.delete('/deleteTask/:id', async (req, res) => {
    const { id } = req.params;
    console.log('req.params.id', req.params.id);
    try {
        const result = await Delete('TodoData', id);
        console.log('result', result)
        res.status(200).json(result);
    } catch (error) {
        console.error("error in router, deleteTask today data", error);
        res.status(500).json({ message: 'Error deleteTask data' });
    }
})

module.exports = router;