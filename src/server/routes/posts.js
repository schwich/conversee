const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const mongo = require('../mongo');
const postSorting = require('../algo/post-sorting');

router.get('/:sortType', function (req, res) {

  console.log('sortType: ', req.params.sortType);
  postSorting.sortPostsByTop(); //todo

  db.any(`SELECT 
            posts.id, posts.title, posts.link, posts.content, posts.created, posts.type, 
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

/* GET posts listing. */
router.get('/', function (req, res) {

  db.any(`SELECT 
            posts.id, posts.title, posts.link, posts.content, posts.created, posts.type, 
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

  let voteValue;
  if (voteValue === 'up') {
    voteValue = 1;
  }
  else {
    voteValue = -1;
  }

  db.none(`INSERT INTO "user-votes" (post_id, user_id, vote) VALUES ($1, $2, $3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3`, [
    req.body.postId,
    req.body.userId,
    voteValue
  ])
    .then(() => {
      res.status(201).json({ 'result': 'success' })
    })
    .catch((err) => { console.log(err); })

});

router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.none(`INSERT INTO "user-saved-posts" (user_id, post_id) VALUES ($1, $2) ON CONFLICT (user_id, post_id) DO NOTHING`, [
    req.body.userId,
    req.body.postId
  ])
    .then(() => {
      res.status(201).json({ 'result': 'success' })
    })
    .catch((err) => { console.log(err); })
})

router.post('/hide', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.none(`INSERT INTO "user-hidden-posts" (user_id, post_id) VALUES ($1, $2) ON CONFLICT (user_id, post_id) DO NOTHING`, [
    req.body.userId,
    req.body.postId
  ])
    .then(() => {
      res.status(201).json({ 'result': 'success' })
    })
    .catch((err) => { console.log(err); })
})

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  db.one('INSERT INTO posts (title, link, content, num_points, owner, type) VALUES ($1, $2, $3, 0, $4, $5) RETURNING *', [
    req.body.title,
    req.body.link,
    req.body.content,
    req.body.owner,
    req.body.type
  ])
    .then(data => {
      resjson(data);
    })
    .catch(error => {
      console.log(error)
    })
});

module.exports = router;
