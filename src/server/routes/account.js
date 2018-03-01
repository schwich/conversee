const express = require('express');
const router = express.Router();
const db = require('../db');
const mongo = require('../mongo');
const passport = require('passport');

router.get('/getUserHiddenPosts', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // NOTE req.user contains JWT payload after passport.authenticate middleware runs
  try {
    const data = await db.any(`
    SELECT
      posts.*
    FROM
      posts
    INNER JOIN 
      "user-hidden-posts" AS uhp
    ON
      uhp.user_id = $1
    AND
      uhp.post_id = posts.id
    `, [req.user.id]);

    res.json(data);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/getUserSavedPosts', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const data = await db.any(`
    SELECT
      posts.*
    FROM
      posts
    INNER JOIN 
      "user-saved-posts" AS usp
    ON
      usp.user_id = $1
    AND
      usp.post_id = posts.id
    `, [req.user.id]);
    res.json(data);
  } 
  catch (err) {
    console.log(err);
  } 
})

module.exports = router;