const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// POST a new ticket
router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json({ message: 'Ticket created', ticket });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ticket by name
router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const tickets = await Ticket.find({ name: new RegExp(name, 'i') });
    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found for this name' });
    }
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
