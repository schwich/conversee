exports.up = (pgm) => {
  pgm.createTable('post-comment-counts', {
    id: 'id',
    post_id: {
      unique: true,
      type: 'int', 
      notNull: true,
      references: 'posts(id)'
    },
    num_comments: {
      type: 'bigint',
      notNull: true,
      default: 0
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('post-comment-counts');
};
