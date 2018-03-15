const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const mongo = require('../mongo');

router.get('/suggest', async (req, res) => {
  // todo
  // querying the db on every character would be crazy
  // this would be a good use for redis!
  // have some tag suggestion module that loads all (or a lot) of tags into memory, and then just query ram for it
  console.log(req.query.q);
  try {
    const result = await db.any(`
    SELECT id, name FROM tags WHERE name LIKE '${req.query.q}%'
    `);

    res.json(result);
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router;