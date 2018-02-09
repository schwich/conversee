const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db');

/* GET posts listing. */
router.get('/', function (req, res, next) {

  db.any('SELECT * FROM posts')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.warn(error);
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  db.one('INSERT INTO posts(title, link, content, num_points) VALUES ($1, $2, $3, 0) RETURNING *', [
    req.body.title,
    req.body.link,
    req.body.content,
  ])
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(error => { console.log(error) })
})

module.exports = router;
