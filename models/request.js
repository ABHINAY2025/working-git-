import { Schema, model } from 'mongoose';

const requestSchema = new Schema({
    requestId: { type: Number, required: true, unique: true }, // Custom numeric ID
    studentId: { type: Number, required: true },
    reason: { type: String, required: true },
    exitTime: { type: Date, required: true },
    returnTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'denied'],
      default: 'pending',
      required: true
    }
  });
  

export default model('Request', requestSchema);
