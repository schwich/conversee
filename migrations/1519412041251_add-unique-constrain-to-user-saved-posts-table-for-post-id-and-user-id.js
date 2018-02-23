exports.up = (pgm) => {
  pgm.addConstraint('user-saved-posts', 'user-saved-posts_user-post_uq', {
    unique: ['post_id', 'user_id']
  })
};

exports.down = (pgm) => {
  pgm.dropConstraint('user-saved-posts', 'user-saved-posts_user-post_uq')
};
