const mongoose = require('mongoose');
const config = require('config');

async function connectToDatabase() {
    try {
        // Retrieve MongoDB URI from config
        const mongodbUri = config.get("MONGODB_URI");
        // Check if the URI is defined
        if (!mongodbUri) {
            throw new Error('MONGODB_URI is not defined in the configuration.');
        }
        // Attempt to connect to the MongoDB database
        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit the process with failure
    }
}

connectToDatabase();

module.exports = mongoose.connection;
