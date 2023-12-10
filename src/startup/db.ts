import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};

export default connectToDatabase;
