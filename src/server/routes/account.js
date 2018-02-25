const express = require('express');
const router = express.Router();
const db = require('../db');
const mongo = require('../mongo');
const passport = require('passport');

router.get('/getUserHiddenPosts', passport.authenticate('jwt', { session: false }), (req, res) => {
  // NOTE req.user contains JWT payload after passport.authenticate middleware runs
  db.any(`
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
          `, [req.user.id])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
})

router.get('/getUserSavedPosts', passport.authenticate('jwt', { session: false }), (req, res) => {
  db.any(`
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
          `, [req.user.id])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
})

module.exports = router;