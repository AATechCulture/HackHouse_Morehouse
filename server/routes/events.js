// server/routes/events.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  createEvent, 
  getEvents, 
  rsvpToEvent 
} = require('../controllers/matchingController');

router.post('/', protect, createEvent);
router.get('/', getEvents);
router.post('/:id/rsvp', protect, rsvpToEvent);

module.exports = router;