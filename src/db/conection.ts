import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI!;

const connect = async (): Promise<boolean> => {
  try {
    await mongoose.connect(MONGO_URI);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default connect;
