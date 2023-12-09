import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/berlin');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};

export default connectToDatabase;
