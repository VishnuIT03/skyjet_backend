import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, default: null },
  gender: { type: String, default: null },
  dob: { type: Date, default: null },
  address: { type: String, default: null },
  city: { type: String, default: null },
  country: { type: String, default: null },
  postal: { type: String, default: null },
  userType: { type: String, default: 'customer' },
  organization: { type: String, default: null },
});

const User = mongoose.model('User', userSchema);

export default User;
