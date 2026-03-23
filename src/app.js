require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', reportRoutes);

app.get('/', (req, res) => {
  res.send('GitHub Access Report API is running');
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});