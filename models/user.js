import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true }, // Roll number field
  branch: { type: String, required: true },  // Branch info
  role: { type: String, default: 'student' } // Role (student/admin)
});

export default model('User', userSchema);
