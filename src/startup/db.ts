import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error(
                'MongoDB connection string not found in environment variables.'
            );
        }

        await mongoose.connect(mongoURI);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};

export default connectToDatabase;
