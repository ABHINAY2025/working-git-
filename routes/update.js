import express from 'express';
import Request from '../models/request.js'; // Assuming you have a Request model

const router = express.Router();

// Example route for admin to update the status of a request
router.put('/update/:id', async (req, res) => {
  const { status } = req.body;
  const requestId = req.params.id;

  // Validate status
  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ message: 'Status must be either approved or denied' });
  }

  try {
    // Find the request by ID and update its status
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request status updated successfully!', request: updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update request status.', error: error.message });
  }
});

export default router;