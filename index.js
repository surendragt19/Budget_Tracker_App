// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const cors=require('cors')
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://surendragt07:NDVWl2RWGLEtiw7s@cluster0.umxbpyc.mongodb.net/budget', { useNewUrlParser: true });

app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "budget_tracker", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
