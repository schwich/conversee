const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

router.post('/login', async function (req, res) {
  if (req.body.username && req.body.password) {
    try {
      const user = await db.one('SELECT id, username, password_hash FROM users WHERE username = $1', [req.body.username])

      bcrypt.compare(req.body.password, user.password_hash, function (err, passwordMatches) {
        if (passwordMatches) {
          console.log('password matches');
          const payload = { id: user.id };
          console.log(user.id)
          const token = jwt.sign(payload, config.JSON_WEB_TOKEN_SECRET);
          res.json({ token })
        }
        else {
          res.status(401).json({ error: 'password or username does not match' })
        }
      })
    }
    catch (error) {
      console.error(error);
      res.status(401).json({ error: 'password or username does not match' })
    }
  }
})

router.post('/register', function (req, res) {
  if (req.body.username && req.body.password) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      // storehash in DB
      db.none('INSERT INTO users(username, password_hash) VALUES($1, $2)', [req.body.username, hash])
        .then(() => {
          res.status(200).end();
        })
        .catch(error => {
          console.error(error);
        })
    })
  }
})

module.exports = router;