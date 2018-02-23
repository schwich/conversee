exports.up = (pgm) => {
  pgm.addConstraint('user-hidden-posts', 'user-hidden-posts_user-post_uq', {
    unique: ['post_id', 'user_id']
  })
};

exports.down = (pgm) => {
  pgm.dropConstraint('user-hidden-posts', 'user-hidden-posts_user-post_uq')
};
