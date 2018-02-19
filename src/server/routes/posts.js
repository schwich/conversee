const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db');

/* GET posts listing. */
router.get('/', function (req, res) {

  db.any(`SELECT 
            posts.id, posts.title, posts.link, posts.content, posts.created, 
              (SELECT COALESCE(SUM(uv.vote), 0) FROM "user-votes" as uv WHERE uv.post_id=posts.id) as num_points, 
              (SELECT u.username FROM users as u WHERE u.id = posts.owner) as owner, 
              ARRAY(
                SELECT tags.name FROM tags INNER JOIN "post-tags" ON "post-tags".tag_id = tags.id 
                WHERE "post-tags".post_id = posts.id
              ) as tags 
          FROM 
            posts 
          ORDER BY 
            num_points DESC`)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.warn(error);
    });
});

router.post('/vote', passport.authenticate('jwt', { session: false }), function (req, res) {
  if (req.body.voteValue !== 'up' && req.body.voteValue !== 'down') {
    console.log(`voteValue ${req.body.voteValue} is not valid`);
  }
  let vote = '';
  if (req.body.voteValue === 'up') {
    vote = '1';
  }
  else {
    vote = '-1';
  }
  db.none(`INSERT INTO "user-votes" (post_id, user_id, vote) VALUES ($1, $2, $3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3`, [
    req.body.postId,
    req.body.userId,
    vote
  ])
    .then(() => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => console.log(error));
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
    .catch(error => {
      console.log(error)
    })
});

module.exports = router;
