const Agenda = require('agenda');

const JOB_NAMES = {
  COUNT_COMMENTS: 'count number of comments for each post'
};

module.exports = {
  init: function(db) {
    console.log('init agenda');

    const agenda = new Agenda();
    agenda
      .mongo(db)
      .processEvery('1 minutes')

      /*
        count post comments in Mongo and report to Postgres
      */
      .define(JOB_NAMES.COUNT_COMMENTS, async (job, done) => {

        const Mongo = require('../mongo');
        const postgres = require('../db');
        
        function countComments(rootComment) {
    
          let commentCount = 0;
      
          const recurseCount = node => {
            if (node.replies != null) {
              node.replies.forEach(n => {
                commentCount += 1;
                recurseCount(n);
              })
            }
          }
      
          recurseCount(rootComment);
      
          return commentCount;
        }
      
        try {
          
          const postCommentCounts = {};
          const commentsCursor = Mongo.get().collection('comments').find({});
      
          while (await commentsCursor.hasNext()) {
            const comment = await commentsCursor.next();
            postCommentCounts[comment.postId] = countComments(comment);
          }
      
          for (let postId in postCommentCounts) {
            await postgres.none(`INSERT INTO "post-comment-counts" (post_id, num_comments) VALUES ($1, $2) ON CONFLICT (post_id) DO UPDATE SET num_comments = $2`, [
              postId,
              postCommentCounts[postId]
            ])
          }
        }
        catch (err) {
          console.log(err);
        }

        done();
      });

    agenda.on('start', (job) => {
      console.log('Job %s is starting', job.attrs.name);
    })

    agenda.on('ready', () => {
      console.log('agenda is ready');
      agenda.every('5 minutes', JOB_NAMES.COUNT_COMMENTS);
    
      agenda.start();

  });
  }
}

