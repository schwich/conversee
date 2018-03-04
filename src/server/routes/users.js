const express = require('express');
const router = express.Router();
const db = require('../db');
const mongo = require('../mongo');
const passport = require('passport');

router.get('/:userId/posts', async (req, res) => {
  try {
    const data = await db.any(`SELECT 
        posts.id, posts.title, posts.link, posts.content, posts.created, posts.type, 
          (SELECT COALESCE(SUM(uv.vote), 0) FROM "user-votes" as uv WHERE uv.post_id=posts.id) as num_points, 
          (SELECT u.username FROM users as u WHERE u.id = posts.owner) as owner, 
          ARRAY(
            SELECT tags.name FROM tags INNER JOIN "post-tags" ON "post-tags".tag_id = tags.id 
            WHERE "post-tags".post_id = posts.id
          ) as tags 
      FROM 
        posts 
      WHERE
        posts.owner = $1
      ORDER BY 
        num_points DESC`, [req.params.userId])
    res.json(data);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/:userId/comments', (req, res) => {
  res.json({ result: "todo" })
})

router.get('/:userId/votes', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const data = await db.any(`
        SELECT 
          post_id,
          CASE WHEN vote = 1 THEN 'up' ELSE 'down' END AS vote
        FROM 
          "user-votes" 
        WHERE 
          user_id = $1`, [req.params.userId]);

    res.json(data);
  } 
  catch (err) {
    console.log(err);
  }
})

router.get('/:userId/hiddenPosts', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const data = await db.any(`
      SELECT 
        post_id
      FROM 
        "user-hidden-posts" 
      WHERE 
        user_id = $1`, [req.params.userId]);

    res.json(data);
  } 
  catch (err) {
    console.log(err);
  }
})

router.get('/:userId/savedPosts', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const data = await db.any(`
      SELECT 
        post_id
      FROM 
        "user-saved-posts" 
      WHERE 
        user_id = $1`, [req.params.userId])

    res.json(data);
  } 
  catch (err) {
    console.log(err);
  }
})

module.exports = router;