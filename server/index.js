const express = require('express');
const cors = require('cors');
const useRouter = require('../server/routes/useRouter');
const { connectToDatabase } = require('../server/DB/database');


const app = express();
const port = 5000;

connectToDatabase();

app.use(express.json());

const corsOption = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOption))

app.use('/api/user', useRouter);

app.listen(port, () => {
    console.log(`server running port : ${port}`)
});