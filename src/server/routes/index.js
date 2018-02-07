const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../dist/app/index.html'));
})

router.get('/hello', (req, res, next) => {
  res.send('Hello world!');
});

module.exports = router;