const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;