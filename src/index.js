const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 