// src/routes/requestRoutes.js
import express from 'express';
import Request from '../models/request.js'; // Import the Request model
import User from '../models/user.js'; // Import the User model for admin email verification

const router = express.Router();

// Middleware to verify if the user is an admin
const verifyAdmin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const admin = await User.findOne({ email, role: 'admin' }); // Assuming 'role' identifies admin users
    if (!admin) {
      return res.status(403).json({ message: 'Unauthorized: Admin access only.' });
    }
    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(500).json({ message: 'Server error during admin verification.' });
  }
};

// Route to add a new request
router.post('/add', async (req, res) => {
  const { studentId, reason, exitTime, returnTime } = req.body;

  if (!studentId || !reason || !exitTime || !returnTime) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newRequest = new Request({
      studentId: Number(studentId),
      reason,
      exitTime: new Date(exitTime),
      returnTime: new Date(returnTime),
      status: 'pending', // Default status
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully!', request: newRequest });
  } catch (error) {
    console.error('Error adding request:', error);
    res.status(500).json({ message: 'Failed to submit request.', error: error.message });
  }
});

// Route for admin to update the status of a request (admin only)
router.put('/update/:requestId', verifyAdmin, async (req, res) => {
  const { status } = req.body;
  const { requestId } = req.params;

  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ message: 'Status must be either "approved" or "denied".' });
  }

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { requestId: Number(requestId) }, // Search by custom requestId
      { status },
      { new: true, runValidators: true } // Return updated document and validate inputs
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    res.status(200).json({ message: 'Request status updated successfully!', request: updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Failed to update request status.', error: error.message });
  }
});

export default router;