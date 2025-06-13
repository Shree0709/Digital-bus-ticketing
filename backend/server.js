const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const ticketRoutes = require('./routes/tickets');
const Ticket = require('./models/Ticket'); // ✅ Import the Ticket model

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use ticket routes
app.use('/api/tickets', ticketRoutes);

// Search ticket by passenger name
app.get("/api/tickets/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const ticket = await Ticket.findOne({ name: name });
    if (!ticket) return res.status(404).send("Ticket not found");
    res.json(ticket);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err)); // ✅ Fixed chaining
