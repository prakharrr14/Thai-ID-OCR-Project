const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lskio1q.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
};
  
connectToMongo()