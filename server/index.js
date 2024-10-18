const express = require('express');
const cors = require('cors');
const useRouter = require('../server/routes/useRouter');
const { connectToDatabase } = require('../server/DB/database');
const http = require('http');
const socketIo = require('socket.io')

const app = express();
const port = 5000;
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', // Change this to the appropriate origin if needed
        // methods: ['GET', 'POST'], // Specify allowed methods if necessary
        credentials: true,
    },
});

connectToDatabase();

app.use(express.json());

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(cors(corsOption))

app.use('/api/user', useRouter);

app.set('socketio', io);


server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
