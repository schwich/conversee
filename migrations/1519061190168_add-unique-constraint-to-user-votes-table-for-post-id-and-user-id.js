exports.up = (pgm) => {
  pgm.addConstraint('user-votes', 'user-votes_user-post_uq', {
    unique: ['post_id', 'user_id']
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('user-votes', 'user-votes_user-post_uq');
};
