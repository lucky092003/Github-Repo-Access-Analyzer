const express = require('express');
const router = express.Router();
const { getAccessReport } = require('../controllers/reportController');

router.get('/', (req, res) => {
  res.send('API is running');
});

router.get('/report', getAccessReport);

module.exports = router;