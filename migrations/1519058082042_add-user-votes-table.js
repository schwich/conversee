exports.up = (pgm) => {
  pgm.createTable('user-votes', {
    id: 'id',
    post_id: {
      type: 'int',
      notNull: true,
      references: 'posts(id)'
    },
    user_id: {
      type: 'int',
      notNull: true,
      references: 'users(id)'
    },
    vote: {
      type: 'int',
      notNull: true
    },
    created: {
      type: 'timestamptz',
      default: pgm.func('CURRENT_TIMESTAMP'),
      notNull: true
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user-votes');
};
