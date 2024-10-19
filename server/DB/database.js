const { MongoClient, ObjectId } = require('mongodb');
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

async function PostData(collectionName, data) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(data);
        console.log("posted data inserted successfully", result)
        return result
    } catch (error) {
        console.error('Error Posting user/tododata in MongoDB:', error);

    }

}

async function findUserExist(collectionName, data) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.findOne(data);
        // console.log('finding user:', result);
        return result
    } catch (error) {
        console.error('Error finding user in MongoDB:', error);
        return null;
    }
}
async function getData(collectionName, id) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.find({ userId: new ObjectId(id) }).toArray();
        return result;
    } catch (error) {
        console.error('Error getting today todo data in MongoDB:', error);
        return null;
    }

}

//update
async function update(collectionName, id, newStatus) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status: newStatus } })
        return result;
    } catch (error) {
        console.error('Error in updating today todo data in MongoDB:', error);
        return null;
    }
}

//delete
async function Delete(collectionName, id) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error in deleting task today todo data in MongoDB:', error);
        return null;
    }
}

//edit get 
async function getEditData(collectionName, id) {
    try {
        // Validate the ID format
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }

        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.find({ _id: new ObjectId(id) }).toArray();
        return result;
    } catch (error) {
        console.error('Error in getEditData MongoDB:', error);
        return null;
    }
}

//update edit data today
async function updateGetData(collectionName, id, newData, time, date) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { Task: newData, Time: time } });
        return result;

    } catch (error) {
        console.error('Error in updateEditData  today MongoDB:', error);
        return null;
    }
}

//update edit data scheduled
async function updateGetDataScheduled(collectionName, id, newData, time, date) {
    try {
        const database = client.db(process.env.MONGODB);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { Task: newData, Time: time, Date: date } });
        return result;

    } catch (error) {
        console.error('Error in updateEditData  today MongoDB:', error);
        return null;
    }
}


module.exports = {
    connectToDatabase,
    PostData,
    findUserExist,
    getData,
    update,
    Delete,
    getEditData,
    updateGetData,
    updateGetDataScheduled
}