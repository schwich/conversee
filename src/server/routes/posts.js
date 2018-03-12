const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const mongo = require('../mongo');
const postSorting = require('../algo/post-sorting');

router.get('/:sortType/page/:pageNum', async (req, res) => {
  let sort;
  switch (req.params.sortType) {
    case 'new':
      sort = 'posts.created DESC'
      break;
    default:
      sort = 'num_points DESC';
  }

  let offset  = (Number(req.params.pageNum) - 1) * 25;

  console.log('offset: ', offset);

  try {
    const data = await db.any(`
    SELECT 
        posts.id, posts.title, posts.link, posts.content, posts.created, posts.type, 
          (SELECT COALESCE(SUM(uv.vote), 0) FROM "user-votes" as uv WHERE uv.post_id=posts.id) as num_points, 
          (SELECT u.username FROM users as u WHERE u.id = posts.owner) as owner, 
          ARRAY (
            SELECT tags.name FROM tags INNER JOIN "post-tags" ON "post-tags".tag_id = tags.id 
            WHERE "post-tags".post_id = posts.id
          ) as tags 
    FROM 
      posts 
    ORDER BY 
      $1:value
    LIMIT
      25
    OFFSET 
      $2
    `, [sort, offset])

    res.json(data);
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/:sortType', async (req, res) => {

  let sort;
  switch (req.params.sortType) {
    case 'new':
      sort = 'posts.created DESC'
      break;
    default:
      sort = 'num_points DESC';
  }

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
      ORDER BY 
        $1:value
      LIMIT
        25

        `, [sort]);
    res.json(data);
  }
  catch (err) {
    console.log(err);
  }
});

/* GET posts listing. */
router.get('/', async (req, res) => {
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
          ORDER BY 
            num_points DESC
	  LIMIT 25`
    );
    res.json(data);

  }
  catch (err) {
    console.log(err);
  }
});

router.post('/vote', passport.authenticate('jwt', { session: false }), async (req, res) => {

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

  try {
    await db.none(`INSERT INTO "user-votes" (post_id, user_id, vote) VALUES ($1, $2, $3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3`, [
      req.body.postId,
      req.body.userId,
      voteValue
    ]);

    res.status(201).json({ 'result': 'success' });
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/unvote', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await db.none(`DELETE FROM "user-votes" WHERE user_id = $1 AND post_id = $2`, [
      req.body.userId,
      req.body.postId
    ]);

    res.json({ 'result': 'success' })
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/save', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await db.none(`INSERT INTO "user-saved-posts" (user_id, post_id) VALUES ($1, $2) ON CONFLICT (user_id, post_id) DO NOTHING`, [
      req.body.userId,
      req.body.postId
    ])
    res.status(201).json({ 'result': 'success' })
  }
  catch (err) {
    console.log(err);
  }
})

router.post('/unsave', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await db.none(`DELETE FROM "user-saved-posts" WHERE user_id = $1 AND post_id = $2`, [
      req.body.userId,
      req.body.postId
    ]);

    res.status(200).json({ 'result': 'success' })
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/hide', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await db.none(`INSERT INTO "user-hidden-posts" (user_id, post_id) VALUES ($1, $2) ON CONFLICT (user_id, post_id) DO NOTHING`, [
      req.body.userId,
      req.body.postId
    ]);

    res.status(201).json({ 'result': 'success' })
  }
  catch (err) {
    console.log(err);
  }
})

// create post
router.post('/', passport.authenticate('jwt', { session: false }), async function (req, res) {

  try {
    const newPost = await db.one(`INSERT INTO posts (title, link, content, num_points, owner, type) VALUES ($1, $2, $3, 0, $4, $5) RETURNING *`, [
      req.body.title,
      req.body.link,
      req.body.content,
      req.body.owner,
      req.body.type
    ]);

    await mongo.get().collection('comments').insert({
      postId: `${newPost.id}`,
      replies: []
    });

    res.json(newPost)

  } catch (err) {
    console.log(err)
  }
});

/**
 * Comments API
 */

router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await mongo.get().collection('comments').findOne({ postId: req.params.postId });
    res.json(comments);
  }
  catch (err) {
    console.log(err);
  }
})

router.post('/:postId/comments', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // need to get the count of siblings of the array of comments to push to, so I can reply to this comment in the future
    const existingElemsCount = await mongo.get().collection('comments').findOne({
      postId: req.params.postId
    })

    const newCommentId = mongo.createObjectID();
    const newCommentCreatedAt = new Date();

    await mongo.get().collection('comments').updateOne(
      { postId: req.params.postId },
      {
        $push: {
          replies: {
            _commentId: newCommentId,
            userId: req.user.id,
            _idx: [existingElemsCount.replies.length], // this is a path to the comment for finding it later
            points: 0,
            username: req.user.username,
            content: req.body.content,
            created: newCommentCreatedAt,
            replies: []
          }
        },
      },
      { upsert: true }
    )

    res.json({
      comment: {
        _commentId: newCommentId,
        _idx: [existingElemsCount.replies.length],
        userId: req.user.id,
        username: req.user.username,
        content: req.body.content,
        created: newCommentCreatedAt,
        points: 0,
        replies: []
      }
    });
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {

    let path = '';
    let newCommentIdx = [];
    for (let part of req.body.commentIdx) {
      path += `replies.${part}.`;
      newCommentIdx.push(part);
    }
    path += 'replies';

    const topLevelReplies = await mongo.get().collection('comments').findOne({
      postId: req.params.postId
    });

    let commentSiblings = topLevelReplies;
    for (let part of req.body.commentIdx) {
      commentSiblings = commentSiblings.replies[part];
    }

    newCommentIdx.push(commentSiblings.replies.length);

    const newCommentId = mongo.createObjectID();
    const newCommentCreatedAt = new Date();

    const result = await mongo.get().collection('comments').updateOne(
      { postId: req.params.postId },
      {
        $push: {
          [path]: {
            _commentId: newCommentId,
            _idx: newCommentIdx,
            userId: req.user.id,
            username: req.user.username,
            content: req.body.content,
            points: 0,
            created: newCommentCreatedAt,
            replies: []
          }
        }
      }
    )

    res.json({
      comment: {
        _commentId: newCommentId,
        _idx: newCommentIdx,
        userId: req.user.id,
        username: req.user.username,
        content: req.body.content,
        created: newCommentCreatedAt,
        points: 0,
        replies: []
      }
    });
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router;
