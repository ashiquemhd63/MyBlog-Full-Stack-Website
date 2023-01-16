let db;
import { MongoClient } from 'mongodb';

async function connctToDb(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('react-blog-db');
    cb();
}

export {
    db,
    connctToDb
}