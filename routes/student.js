import { Router } from 'express';
const router = Router();
import User from '../models/user.js'; // Import the student model

// Get student by roll number
// router.use(express.json()); 

router.get('/roll/:rollNumber', async (req, res) => {
  const { rollNumber } = req.params;

  try {
    // Find the student based on the roll number
    const student = await User.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);  // Return student data
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching student' });
  }
});

export default router;
