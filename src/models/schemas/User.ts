import * as mongoose from 'mongoose';

import IUser from '../interfaces/IUser';

// Create schema
export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Bind schema to model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
