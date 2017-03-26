import * as mongoose from 'mongoose';

// Interface for model
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

export default IUser;
