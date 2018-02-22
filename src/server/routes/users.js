const express = require('express');
const router = express.Router();
const db = require('../db');
const mongo = require('../mongo');

router.get('/:userId/votes', (req, res) => {
  db.any(`
        SELECT 
          post_id, 
          CASE WHEN vote = 1 THEN 'up' ELSE 'down' END AS vote
        FROM 
          "user-votes" 
        WHERE 
          user_id = $1
  `, [req.params.userId])
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.warn(data);
    })
})

router.get('/:userId/savedPosts', (req, res) => {
  mongo.get().collection('userSavedPosts').find({userId: req.params.userId}).toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
})

module.exports = router;