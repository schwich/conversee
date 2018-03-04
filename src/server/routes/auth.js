const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

router.post('/login', async (req, res) => {
  if (req.body.username && req.body.password) {
    try {
      const user = await db.one('SELECT id, username, password_hash FROM users WHERE username = $1', [req.body.username])

      bcrypt.compare(req.body.password, user.password_hash, function (err, passwordMatches) {
        if (passwordMatches) {
          console.log('password matches');
          const payload = { 
            id: user.id,
            username: user.username 
          };
          console.log(user.id)
          const token = jwt.sign(payload, config.JSON_WEB_TOKEN_SECRET);
          res.json({
            token,
            uid: user.id,
            username: user.username
          })
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

router.post('/register', async (req, res) => {
  if (req.body.username && req.body.password) {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      try {
        let user = '';
        if (req.body.email) {
          user = await db.one('INSERT INTO users(username, password_hash, email) VALUES($1, $2, $3) RETURNING id, username', [req.body.username, hash, req.body.email]);
        }
        else {
          user = await db.one('INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING id, username', [req.body.username, hash]);
        }
        
        const token = jwt.sign({id: user.id}, config.JSON_WEB_TOKEN_SECRET);
        res.json({
          token,
          user: {
            uid: user.id,
            username: user.username
          }
        })
      }
      catch (error) {
        console.log(error);
      }
    });
  }
})

module.exports = router;