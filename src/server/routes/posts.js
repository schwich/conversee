const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db');

/* GET posts listing. */
router.get('/', function (req, res, next) {

  db.any(`SELECT posts.id, posts.title, posts.link, posts.content, posts.created, posts.num_points, (SELECT u.username FROM users as u WHERE u.id = posts.owner) as owner, ARRAY(
            SELECT tags.name FROM tags INNER JOIN "post-tags" ON "post-tags".tag_id = tags.id 
              WHERE "post-tags".post_id = posts.id
        ) as tags FROM posts`)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.warn(error);
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  db.one('INSERT INTO posts(title, link, content, num_points, owner) VALUES ($1, $2, $3, 0, $4) RETURNING *', [
    req.body.title,
    req.body.link,
    req.body.content,
    req.body.owner
  ])
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(error => { console.log(error) })
})

module.exports = router;
