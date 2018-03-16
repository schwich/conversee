const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const mongo = require('../mongo');

router.get('/suggest', async (req, res) => {
  // todo
  // querying the db on every character would be crazy
  // this would be a good use for redis!
  // have some tag suggestion module that loads all (or a lot) of tags into memory, and then just query ram for it
  console.log(req.query.q);
  try {
    const result = await db.any(`
    SELECT id, name FROM tags WHERE name LIKE '${req.query.q}%'
    `);

    res.json(result);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/:tagName/posts', async (req, res) => {
  try {
    const results = await db.any(`
      SELECT 
        p.id, p.title, p.link, p.content, p.created, p.type,
        (SELECT COALESCE(SUM(uv.vote), 0) FROM "user-votes" as uv WHERE uv.post_id=p.id) as num_points,
        (SELECT u.username FROM users as u WHERE u.id = p.owner) as owner,
        pcc.num_comments,
        ARRAY (
                SELECT tags.name FROM tags INNER JOIN "post-tags" ON "post-tags".tag_id = tags.id 
                WHERE "post-tags".post_id = p.id
              ) as tags
      FROM
        tags t
      INNER JOIN 
        "post-tags" pt 
      ON 
        pt.tag_id = t.id
      INNER JOIN 
        "posts" p 
      ON 
        p.id = pt.post_id
      LEFT JOIN 
        "post-comment-counts" pcc 
      ON 
        pcc.post_id = p.id
      WHERE 
        t.name = $1
    `, [req.params.tagName]);

    res.json(results);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/:tagName/posts/:sortType/page/:pageNum', async (req, res) => {

  let sort;
  switch (req.params.sortType) {
    case 'new':
      sort = 'posts.created DESC'
      break;
    default:
      sort = 'num_points DESC';
  }

  let offset = (Number(req.params.pageNum) - 1) * 25;

  try {

    const results = await db.any(`
    SELECT 
      p.id, p.title, p.link, p.content, p.created, p.type,
      (SELECT COALESCE(SUM(uv.vote), 0) FROM "user-votes" as uv WHERE uv.post_id=p.id) as num_points,
      (SELECT u.username FROM users as u WHERE u.id = p.owner) as owner,
      pcc.num_comments,
      ARRAY (
              SELECT tags.name FROM tags INNER JOIN "post-tags" ON "post-tags".tag_id = tags.id 
              WHERE "post-tags".post_id = p.id
            ) as tags
    FROM
      tags t
    INNER JOIN 
      "post-tags" pt 
    ON 
      pt.tag_id = t.id
    INNER JOIN 
      "posts" p 
    ON 
      p.id = pt.post_id
    LEFT JOIN 
      "post-comment-counts" pcc 
    ON 
      pcc.post_id = p.id
    WHERE 
      t.name = $1
    ORDER BY 
      $2:value
    LIMIT 
      25
    OFFSET
      $3
  `, [req.params.tagName, sort, offset]);

    res.json(results);
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router;