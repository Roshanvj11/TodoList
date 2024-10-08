const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.MONGO_URI;
console.log('connectionString', connectionString);

const client = new MongoClient(connectionString);


async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server')
    } catch (error) {
        console.error('Error Connecting ton the database', error)
    }
}
connectToDatabase()

async function registerData(collectionName,data) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(data);
        console.log("register data inserted successfully",result)
        return result
    } catch (error) {
        console.error('Error adding registor user in MongoDB:', error);
    }

}

module.exports = {
    connectToDatabase,
    registerData
}